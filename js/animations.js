(function () {
    "use strict";

    const root = document.documentElement;
    const supportsIntersectionObserver =
        "IntersectionObserver" in window;
    const prefersReducedMotionQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    const revealTargets = new WeakSet();
    const counterTargets = new WeakSet();

    const revealObserver = supportsIntersectionObserver
        ? new IntersectionObserver(
              handleRevealIntersection,
              {
                  root: null,
                  rootMargin: "0px 0px -12% 0px",
                  threshold: 0.18,
              }
          )
        : null;

    const counterObserver = supportsIntersectionObserver
        ? new IntersectionObserver(
              handleCounterIntersection,
              {
                  root: null,
                  rootMargin: "0px 0px -10% 0px",
                  threshold: 0.35,
              }
          )
        : null;

    const MONTH_PATTERN =
        /\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\b/i;

    const DATE_CONTEXT_PATTERN =
        /\b(?:mon|tue|wed|thu|fri|sat|sun|am|pm|today|tomorrow|yesterday)\b/i;

    const PHONE_PATTERN =
        /^\+?\d[\d\s().-]{7,}\d$/;

    const TIME_PATTERN =
        /^\d{1,2}:\d{2}\s*(?:am|pm)?$/i;

    const LEADING_COUNTER_PATTERN =
        /^([\d,]+(?:\.\d+)?)\s*(.*)$/;

    const RATIO_COUNTER_PATTERN =
        /^([\d,]+(?:\.\d+)?)\s*(?:of|\/)\s*([\d,]+(?:\.\d+)?)(.*)$/i;

    const NUMERIC_TOKEN_PATTERN =
        /([\u20b9$\u20ac\u00a3])?\s*(\d[\d,]*\.?\d*)(\+|%|k|m|K|M)?/g;

    const FORBIDDEN_CONTEXT_PATTERN =
        /\b(?:date|day|time|phone|address|invoice|code|id|nav|breadcrumb|schedule|calendar)\b/i;

    const GROUP_CONTAINER_PATTERN =
        /(?:grid|list|cards?|items?|steps?|timeline|journey|process|highlights?|features?|benefits?|plans?|menu|stats?|summary|delivery|billing|transactions?|activity|overview|testimonials?|controls?|options?|footer|columns?|stats?|cards?)/i;

    const NO_REVEAL_PATTERN =
        /(?:site-footer|footer-top|footer-bottom|footer-column|footer-widget|nouriva-h2-bottom|h2-bottom|h2-availability)/i;

    const REVEAL_VARIANTS = {
        hero: "up",
        up: "up",
        left: "left",
        right: "right",
        scale: "scale",
    };

    root.classList.add("reveal-ready");

    if (prefersReducedMotionQuery.matches) {
        root.classList.add("reduce-motion");
    }

    function handleRevealIntersection(entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        });
    }

    function handleCounterIntersection(entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        });
    }

    function safeObserveReveal(element) {
        if (!element || revealTargets.has(element)) return;

        if (NO_REVEAL_PATTERN.test(getClassText(element))) {
            return;
        }

        revealTargets.add(element);
        element.classList.add("reveal");

        if (!element.classList.contains("reveal-left") &&
            !element.classList.contains("reveal-right") &&
            !element.classList.contains("reveal-scale")
        ) {
            element.classList.add("reveal-up");
        }

        if (
            prefersReducedMotionQuery.matches ||
            !revealObserver
        ) {
            element.classList.add("is-visible");
            return;
        }

        revealObserver.observe(element);
    }

    function safeObserveCounter(element) {
        if (!element || counterTargets.has(element)) return;

        const currentText =
            normalizeText(element.textContent);

        if (!isEligibleCounterText(element, currentText)) {
            return;
        }

        counterTargets.add(element);
        element.classList.add("counter");

        if (
            prefersReducedMotionQuery.matches ||
            !counterObserver
        ) {
            element.textContent = currentText;
            return;
        }

        counterObserver.observe(element);
    }

    function normalizeText(text) {
        return String(text || "")
            .replace(/\s+/g, " ")
            .trim();
    }

    function getClassText(element) {
        const className =
            element && element.className
                ? element.className.toString()
                : "";

        return className
            .replace(/\s+/g, " ")
            .trim();
    }

    function getContextClassText(element) {
        const context =
            element.closest(
                [
                    "[class*='stat']",
                    "[class*='summary']",
                    "[class*='progress']",
                    "[class*='badge']",
                    "[class*='rating']",
                    "[class*='overview']",
                    "[class*='plan']",
                    "[class*='delivery']",
                    "[class*='billing']",
                    "[class*='nutrition']",
                    "[class*='subscription']",
                    "[class*='meal']",
                    "[class*='count']",
                    "[class*='metric']",
                ].join(",")
            ) || element.parentElement;

        return getClassText(context);
    }

    function isBlockedByContext(element, text) {
        const classText = getContextClassText(element);

        if (/[\u20b9$\u20ac\u00a3]/.test(text)) {
            return true;
        }

        if (FORBIDDEN_CONTEXT_PATTERN.test(classText)) {
            return true;
        }

        if (PHONE_PATTERN.test(text)) return true;
        if (TIME_PATTERN.test(text)) return true;
        if (MONTH_PATTERN.test(text) && /\d/.test(text)) {
            return true;
        }
        if (DATE_CONTEXT_PATTERN.test(text) && /\d/.test(text)) {
            return true;
        }

        return false;
    }

    function isEligibleCounterText(element, text) {
        if (!text) return false;

        if (isBlockedByContext(element, text)) {
            return false;
        }

        if (
            /^\d{4}$/.test(text) &&
            /\b(?:est|year|since)\b/i.test(getClassText(element))
        ) {
            return true;
        }

        if (RATIO_COUNTER_PATTERN.test(text)) {
            return true;
        }

        if (LEADING_COUNTER_PATTERN.test(text)) {
            const remainder = text.replace(
                /^[\d,]+(?:\.\d+)?\s*/,
                ""
            );

            if (!remainder) return true;

            if (
                /^\s*(?:of|\/)\s*[\d,]+(?:\.\d+)?/.test(remainder) ||
                /^(?:\s*Meals?\b|\s*kcal\b|\s*g\b|\s*members?\b|\s*reviews?\b|\s*deliveries?\b|\s*orders?\b|\s*plans?\b|\s*customers?\b|\s*years?\b|\s*days?\b|\s*weeks?\b|\s*months?\b|\s*remaining\b|\s*selected\b|\s*completed\b|\s*confirmed\b)/i.test(
                    remainder
                )
            ) {
                return true;
            }
        }

        return false;
    }

    function formatNumber(value, original) {
        const cleanOriginal = String(original || "");
        const useDecimals = /\./.test(cleanOriginal);
        const decimals = useDecimals
            ? Math.max(
                  0,
                  cleanOriginal.split(".")[1].length
              )
            : 0;

        const rounded = useDecimals
            ? value.toFixed(decimals)
            : Math.round(value).toString();

        if (!/,/.test(cleanOriginal)) {
            return rounded;
        }

        const parts = rounded.split(".");
        parts[0] = parts[0].replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
        );
        return parts.join(".");
    }

    function buildCounterFrame(template, values) {
        if (values.length === 0) return template;

        let index = 0;

        return template.replace(
            /([₹$€£])?\s*([\d,]+(?:\.\d+)?)/g,
            function (match, currency, numeric) {
                const value = values[index];
                index += 1;

                if (typeof value !== "number") {
                    return match;
                }

                const formatted = formatNumber(value, numeric);

                if (currency) {
                    return currency + formatted;
                }

                return formatted;
            }
        );
    }

    function animateCounter(element) {
        const text = normalizeText(element.textContent);

        const ratioMatch = text.match(RATIO_COUNTER_PATTERN);

        if (ratioMatch) {
            const startValue = parseFloat(ratioMatch[1].replace(/,/g, ""));
            const endValue = parseFloat(ratioMatch[2].replace(/,/g, ""));
            const suffix = ratioMatch[3] || "";

            animateCount(element, text, [startValue, endValue], function (values) {
                const left = formatNumber(values[0], ratioMatch[1]);
                const right = formatNumber(values[1], ratioMatch[2]);
                element.textContent = `${left} / ${right}${suffix}`;
            });

            return;
        }

        const tokenMatches = Array.from(
            text.matchAll(NUMERIC_TOKEN_PATTERN)
        );

        if (tokenMatches.length === 1) {
            const match = tokenMatches[0];
            const prefix = match[1] || "";
            const numeric = match[2];
            const suffix = match[3] || "";
            const endValue = parseFloat(
                numeric.replace(/,/g, "")
            );

            if (Number.isNaN(endValue)) return;

            const before = text.slice(0, match.index);
            const after = text.slice(
                match.index + match[0].length
            );

            animateCount(element, text, [endValue], function (values) {
                const nextValue = formatNumber(values[0], numeric);
                element.textContent =
                    before + prefix + nextValue + suffix + after;
            });
            return;
        }

        const leadingMatch = text.match(LEADING_COUNTER_PATTERN);

        if (
            leadingMatch &&
            /^\s*\/\s*[A-Za-z].*$/.test(leadingMatch[2])
        ) {
            const numeric = leadingMatch[1];
            const suffix = leadingMatch[2] || "";
            const endValue = parseFloat(
                numeric.replace(/,/g, "")
            );

            if (Number.isNaN(endValue)) return;

            animateCount(element, text, [endValue], function (values) {
                const nextValue = formatNumber(values[0], numeric);
                element.textContent = `${nextValue}${suffix}`;
            });
        }
    }

    function animateCount(element, finalText, values, render) {
        if (!element) return;

        const duration = 1700;
        const startTime = performance.now();

        function step(now) {
            const progress = Math.min(
                1,
                (now - startTime) / duration
            );

            const eased = easeOutCubic(progress);
            const frameValues = values.map(function (target) {
                return target * eased;
            });

            render(frameValues);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = finalText;
            }
        }

        window.requestAnimationFrame(step);
    }

    function easeOutCubic(value) {
        return 1 - Math.pow(1 - value, 3);
    }

    function staggerDirectChildren(container, variant) {
        const children = Array.from(container.children).filter(
            function (child) {
                return child && child.nodeType === 1;
            }
        );

        if (!children.length) return;

        children.forEach(function (child, index) {
            if (child.matches("script, style")) return;

            const delay = Math.min(index * 110, 550);

            if (
                variant === "left" ||
                variant === "right" ||
                variant === "scale"
            ) {
                child.classList.add(`reveal-${variant}`);
            }

            safeObserveReveal(child);

            if (delay) {
                child.classList.add("stagger-item");
                child.style.setProperty(
                    "--reveal-delay",
                    `${delay}ms`
                );
            }
        });
    }

    function inferVariantFromContainer(container) {
        const classText = getClassText(container).toLowerCase();

        if (
            /timeline|journey|process|history|sequence/.test(classText)
        ) {
            return "left";
        }

        if (/hero|visual|image|preview/.test(classText)) {
            return "scale";
        }

        return "up";
    }

    function markSectionChildren(section) {
        const directChildren = Array.from(section.children).filter(
            function (child) {
                if (!(child instanceof HTMLElement)) return false;

                const classText = getClassText(child).toLowerCase();

                return !/overlay|background|decor|shape|stroke|line/.test(
                    classText
                ) && !NO_REVEAL_PATTERN.test(classText);
            }
        );

        if (!directChildren.length) return;

        directChildren.forEach(function (child, index) {
            const classText = getClassText(child).toLowerCase();
            const variant =
                /timeline|journey|process|history|sequence/.test(
                    classText
                )
                    ? index % 2 === 0
                        ? "left"
                        : "right"
                    : /image|visual|media|figure|photo|picture/.test(
                          classText
                      )
                    ? "scale"
                    : "up";

            const delay = Math.min(index * 110, 550);

            safeObserveReveal(child);

            if (variant !== "up") {
                child.classList.add(`reveal-${variant}`);
            }

            if (delay) {
                child.classList.add("stagger-item");
                child.style.setProperty(
                    "--reveal-delay",
                    `${delay}ms`
                );
            }
        });
    }

    function registerRevealSystem() {
        const sectionNodes = Array.from(
            document.querySelectorAll("section")
        );

        sectionNodes.forEach(function (section) {
            safeObserveReveal(section);
            markSectionChildren(section);
        });

        const targetedContainers = Array.from(
            document.querySelectorAll(
                [
                    "[class*='hero']",
                    "[class*='intro']",
                    "[class*='copy']",
                    "[class*='content']",
                    "[class*='heading']",
                    "[class*='header']",
                    "[class*='summary']",
                    "[class*='panel']",
                    "[class*='grid']",
                    "[class*='list']",
                    "[class*='cards']",
                    "[class*='card']",
                    "[class*='steps']",
                    "[class*='timeline']",
                    "[class*='journey']",
                    "[class*='process']",
                    "[class*='highlights']",
                    "[class*='features']",
                    "[class*='benefits']",
                    "[class*='plans']",
                    "[class*='menu']",
                    "[class*='stats']",
                    "[class*='overview']",
                    "[class*='delivery']",
                    "[class*='billing']",
                    "[class*='transactions']",
                    "[class*='activity']",
                    "[class*='testimonials']",
                    "[class*='controls']",
                    "[class*='options']",
                    "[class*='account']",
                ].join(",")
            )
        );

        targetedContainers.forEach(function (container) {
            if (
                container.closest("header, nav") ||
                container.closest(".menu-toggle") ||
                NO_REVEAL_PATTERN.test(getClassText(container))
            ) {
                return;
            }

            const classText = getClassText(container).toLowerCase();
            const variant = inferVariantFromContainer(container);

            safeObserveReveal(container);

            if (GROUP_CONTAINER_PATTERN.test(classText)) {
                staggerDirectChildren(container, variant);
                return;
            }

            if (
                /hero|intro|copy|content|heading|header|summary|panel/.test(
                    classText
                )
            ) {
                markSectionChildren(container);
            }
        });

        const commonCopyBlocks = Array.from(
            document.querySelectorAll(
                [
                    ".site-footer .footer-column",
                    ".site-footer .footer-widget",
                    ".nouriva-dashboard-sidebar .nouriva-dashboard-nav-link",
                    ".nouriva-dashboard-sidebar-mobile .nouriva-sidebar-quick-action",
                    ".nouriva-dashboard-content > section",
                    ".nouriva-dashboard-content > div",
                ].join(",")
            )
        );

        commonCopyBlocks.forEach(function (element, index) {
            const variant =
                index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right";
            safeObserveReveal(element);
            if (variant !== "up") {
                element.classList.add(`reveal-${variant}`);
            }
            element.classList.add("stagger-item");
            element.style.setProperty(
                "--reveal-delay",
                `${Math.min(index * 90, 420)}ms`
            );
        });
    }

    function registerCounters() {
        const counterSelectors = [
            ".nouriva-badge-number",
            ".nouriva-testimonials-rating strong",
            ".nouriva-testimonials-rating span",
            ".h2-story-stamp strong",
            ".weekly-stat-card strong",
            ".weekly-nutrition-main strong",
            ".meal-plan-progress-value",
            ".dash-overview-plan-details strong",
            ".dash-progress-heading strong",
            ".dash-progress-circle strong",
            ".subscription-current-price strong",
            ".subscription-meals strong",
            ".subscription-card-price strong",
            ".delivery-meal-info strong",
            ".delivery-progress-header strong",
            ".h2-dashboard-preview strong",
            ".h2-plan-summary strong",
            ".h2-plan-price strong",
            ".h2-delivery-card strong",
            ".h2-dashboard-status strong",
            ".meal-flex-step-number",
            ".meal-style-number",
            "[id^='summary-']",
            "[id^='preview-']",
            "[class*='counter']",
            "[class*='stat'] strong",
            "[class*='stat'] span",
            "[class*='rating'] strong",
            "[class*='rating'] span",
            "[class*='progress'] strong",
            "[class*='progress'] span",
            "[class*='summary'] strong",
            "[class*='summary'] span",
            "[class*='nutrition'] strong",
            "[class*='nutrition'] span",
            "[class*='badge'] strong",
            "[class*='badge'] span",
            "[class*='plan'] strong",
            "[class*='plan'] span",
            "[class*='delivery'] strong",
            "[class*='delivery'] span",
        ];

        const uniqueNodes = new Set();

        counterSelectors.forEach(function (selector) {
            document
                .querySelectorAll(selector)
                .forEach(function (node) {
                    if (node && node.nodeType === 1) {
                        uniqueNodes.add(node);
                    }
                });
        });

        uniqueNodes.forEach(function (node) {
            safeObserveCounter(node);
        });
    }

    function registerStaticRevealHelpers() {
        const heroCopySelectors = [
            ".nouriva-hero-copy > *",
            ".nouriva-h2-content > *",
            ".inner-page-hero-content > *",
            ".about-beginning-intro > *",
            ".about-approach-title > *",
            ".about-standard-header > *",
            ".about-week-header > *",
            ".meal-style-intro > *",
            ".weekly-plans-header > *",
            ".meal-flex-content > *",
            ".meal-delivery-location-top > *",
            ".meal-pricing-heading > *",
            ".meal-plans-cta-copy > *",
            ".contact-details-area > *",
            ".contact-message-heading > *",
            ".contact-location-card > *",
            ".nouriva-login-card > *",
            ".nouriva-register-card > *",
            ".nouriva-dashboard-header-left > *",
            ".nouriva-dashboard-header-right > *",
            ".dash-section-header > *",
            ".dash-overview-plan-head > *",
            ".dash-progress-heading > *",
            ".dash-subscription-title > *",
            ".subscription-current-plan > *",
            ".subscription-current-price > *",
            ".subscription-renewal > *",
            ".subscription-meals > *",
            ".delivery-next-top > *",
            ".delivery-progress-header > *",
            ".account-section-header > *",
            ".billing-section-header > *",
        ];

        const seen = new Set();

        heroCopySelectors.forEach(function (selector) {
            document
                .querySelectorAll(selector)
                .forEach(function (node) {
                    if (seen.has(node)) return;
                    seen.add(node);
                    safeObserveReveal(node);
                });
        });
    }

    function init() {
        registerRevealSystem();
        registerStaticRevealHelpers();
        registerCounters();

        if (!supportsIntersectionObserver) {
            document
                .querySelectorAll(".reveal")
                .forEach(function (element) {
                    element.classList.add("is-visible");
                });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, {
            once: true,
        });
    } else {
        init();
    }
})();
