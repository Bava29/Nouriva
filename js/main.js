/* =========================================================
   NOURIVA GLOBAL THEME / RTL STATE
========================================================= */

(function () {

    const root = document.documentElement;

    const themeStorageKey = "nouriva-theme";
    const directionStorageKey = "nouriva-direction";

    const legacyThemeKeys = [
        "nouriva-dashboard-theme"
    ];

    const legacyDirectionKeys = [
        "nouriva-dashboard-rtl"
    ];

    const themeButtonsSelector = [
        "#darkModeToggle",
        "#login-theme-toggle",
        "#register-theme-toggle",
        "[data-theme-toggle]",
        "[data-action=\"theme\"]",
        "button[aria-label*=\"Dark\"]",
        "button[aria-label*=\"dark\"]"
    ].join(", ");

    const directionButtonsSelector = [
        "#rtlToggle",
        "#login-rtl-toggle",
        "#register-rtl-toggle",
        "[data-rtl-toggle]",
        "[data-action=\"rtl\"]",
        "button[aria-label*=\"RTL\"]",
        "button[aria-label*=\"Rtl\"]"
    ].join(", ");

    const logoSelector = [
        ".brand-logo img",
        ".footer-logo img",
        ".nouriva-login-logo img",
        ".nouriva-register-logo img",
        ".nouriva-dashboard-logo img",
        "[data-nouriva-logo]"
    ].join(", ");

    const lightLogoSrc = "images/logo.png";
    const darkLogoSrc = "images/logo-light.png";


    function safeReadStorage(key, fallback) {

        try {

            const value = localStorage.getItem(key);

            return value || fallback;

        } catch (error) {

            return fallback;

        }

    }


    function readStoredValue(primaryKey, legacyKeys, fallback, allowedValues) {

        const primaryValue = safeReadStorage(primaryKey, "");

        if (allowedValues.indexOf(primaryValue) !== -1) {
            return primaryValue;
        }

        for (let index = 0; index < legacyKeys.length; index += 1) {

            const legacyValue =
                safeReadStorage(legacyKeys[index], "");

            if (allowedValues.indexOf(legacyValue) !== -1) {
                return legacyValue;
            }

        }

        return fallback;

    }


    function safeWriteStorage(key, value) {

        try {

            localStorage.setItem(key, value);

        } catch (error) {

            /* Ignore storage failures */

        }

    }


    function syncThemeButtons(isDark) {

        const themeButtons =
            document.querySelectorAll(themeButtonsSelector);

        themeButtons.forEach(function (button) {

            const icon = button.querySelector("i");

            button.classList.toggle("is-active", isDark);

            button.setAttribute(
                "aria-pressed",
                isDark ? "true" : "false"
            );

            if (!icon) {
                return;
            }

            icon.classList.remove("fa-moon", "fa-sun");
            icon.classList.add(isDark ? "fa-sun" : "fa-moon");

        });

    }


    function syncDirectionButtons(isRtl) {

        const directionButtons =
            document.querySelectorAll(directionButtonsSelector);

        directionButtons.forEach(function (button) {

            button.classList.toggle("is-active", isRtl);

            button.setAttribute(
                "aria-pressed",
                isRtl ? "true" : "false"
            );

        });

    }


    function syncLogoSources(isDark) {

        const logos = document.querySelectorAll(logoSelector);
        const nextSrc = isDark ? darkLogoSrc : lightLogoSrc;

        logos.forEach(function (logo) {

            if (logo.tagName !== "IMG") {
                return;
            }

            if (logo.getAttribute("src") !== nextSrc) {
                logo.setAttribute("src", nextSrc);
            }

        });

    }


    function applyTheme(theme, persist) {

        const isDark =
            theme === "dark";

        const normalizedTheme =
            isDark ? "dark" : "light";

        root.setAttribute("data-theme", normalizedTheme);
        root.setAttribute("data-dashboard-theme", normalizedTheme);

        syncThemeButtons(isDark);
        syncLogoSources(isDark);

        if (persist) {

            safeWriteStorage(themeStorageKey, normalizedTheme);

        }

    }


    function applyDirection(direction, persist) {

        const isRtl =
            direction === "rtl";

        const normalizedDirection =
            isRtl ? "rtl" : "ltr";

        root.setAttribute("dir", normalizedDirection);

        syncDirectionButtons(isRtl);

        if (persist) {

            safeWriteStorage(
                directionStorageKey,
                normalizedDirection
            );

        }

    }


    function toggleTheme() {

        const currentTheme =
            root.getAttribute("data-theme") || "light";

        applyTheme(
            currentTheme === "dark" ? "light" : "dark",
            true
        );

    }


    function toggleDirection() {

        const currentDirection =
            root.getAttribute("dir") || "ltr";

        applyDirection(
            currentDirection === "rtl" ? "ltr" : "rtl",
            true
        );

    }


    const savedTheme =
        readStoredValue(
            themeStorageKey,
            legacyThemeKeys,
            "light",
            ["dark", "light"]
        );

    const savedDirection =
        readStoredValue(
            directionStorageKey,
            legacyDirectionKeys,
            "ltr",
            ["rtl", "ltr"]
        );


    applyTheme(savedTheme, false);
    applyDirection(savedDirection, false);


    document.querySelectorAll(themeButtonsSelector).forEach(function (button) {

        button.addEventListener("click", function () {
            toggleTheme();
        });

    });


    document.querySelectorAll(directionButtonsSelector).forEach(function (button) {

        button.addEventListener("click", function () {
            toggleDirection();
        });

    });

})();

/* =========================================================
   MEAL PLANS INTERACTION
========================================================= */

const planChoices = document.querySelectorAll(".plan-choice");

const featuredImage = document.querySelector(".featured-plan-image img");
const featuredTag = document.querySelector(".featured-plan-tag");

const featuredLabel = document.querySelector(".featured-plan-label");
const featuredTitle = document.querySelector(".featured-plan-content h3");
const featuredPrice = document.querySelector(".featured-price strong");
const featuredPricePeriod = document.querySelector(".featured-price span");

const featuredDescription =
    document.querySelector(".featured-plan-content > p");

const planIncludes =
    document.querySelector(".plan-includes");

const planAction =
    document.querySelector(".plan-action");


if (planChoices.length > 0) {

    const planData = [

        {
            label: "DAILY TIFFIN",
            title: "Your Daily Meal, Sorted.",
            price: "₹149",
            period: "/ day",
            description:
                "A freshly prepared home-style meal delivered to you every day with simple and convenient ordering.",
            image: "images/meal-plan-1.jpg",
            tag: "EASY EVERYDAY",
            button: "Choose Daily Plan",

            includes: [
                "Freshly prepared daily meal",
                "Choose your preferred cuisine",
                "Dietary preference options",
                "Flexible meal selection"
            ]
        },

        {
            label: "WEEKLY PLAN",
            title: "Your Week, Sorted.",
            price: "₹899",
            period: "/ week",
            description:
                "Enjoy seven thoughtfully planned home-style meals with flexible cuisine and dietary preferences.",
            image: "images/meal-plan-2.jpg",
            tag: "MOST POPULAR",
            button: "Choose Weekly Plan",

            includes: [
                "7 freshly prepared meals",
                "Choose your preferred cuisine",
                "Dietary preference options",
                "Flexible subscription management"
            ]
        },

        {
            label: "FAMILY PLAN",
            title: "Good Food for Everyone.",
            price: "₹2,499",
            period: "/ week",
            description:
                "A convenient meal solution designed for families who want delicious, home-style food throughout the week.",
            image: "images/meal-plan-3.jpg",
            tag: "FAMILY FAVORITE",
            button: "Choose Family Plan",

            includes: [
                "Meals for multiple members",
                "Multiple cuisine choices",
                "Family-friendly meal options",
                "Flexible delivery schedule"
            ]
        },

        {
            label: "CUSTOM PLAN",
            title: "Built Around You.",
            price: "Custom",
            period: " your way",
            description:
                "Create a meal plan around your routine, food preferences, dietary needs and preferred delivery schedule.",
            image: "images/meal-plan-4.jpg",
            tag: "PERSONALIZED",
            button: "Create Your Plan",

            includes: [
                "Personalized meal selection",
                "Cuisine preference choices",
                "Dietary preference options",
                "Flexible subscription controls"
            ]
        }

    ];


    planChoices.forEach(function (choice, index) {

        choice.addEventListener("click", function () {

            /* Remove active state */
            planChoices.forEach(function (item) {
                item.classList.remove("active");
            });

            /* Add active state */
            choice.classList.add("active");


            /* Get selected plan */
            const plan = planData[index];


            /* Update image */
            if (featuredImage) {
                featuredImage.src = plan.image;
                featuredImage.alt = plan.title;
            }


            /* Update content */
            if (featuredTag) {
                featuredTag.textContent = plan.tag;
            }

            if (featuredLabel) {
                featuredLabel.textContent = plan.label;
            }

            if (featuredTitle) {
                featuredTitle.innerHTML =
                    plan.title.replace(
                        " ",
                        " <span>"
                    );

                /*
                 * Keep title styling simple.
                 * Rebuild title properly below.
                 */
                const titleParts = plan.title.split(" ");

                if (titleParts.length > 2) {

                    const firstPart =
                        titleParts.slice(
                            0,
                            Math.ceil(titleParts.length / 2)
                        ).join(" ");

                    const secondPart =
                        titleParts.slice(
                            Math.ceil(titleParts.length / 2)
                        ).join(" ");

                    featuredTitle.innerHTML =
                        firstPart +
                        ' <span>' +
                        secondPart +
                        '</span>';
                }
            }


            /* Update price */
            if (featuredPrice) {
                featuredPrice.textContent = plan.price;
            }

            if (featuredPricePeriod) {
                featuredPricePeriod.textContent = plan.period;
            }


            /* Update description */
            if (featuredDescription) {
                featuredDescription.textContent =
                    plan.description;
            }


            /* Update included features */
            if (planIncludes) {

                planIncludes.innerHTML = "";

                plan.includes.forEach(function (item) {

                    const listItem =
                        document.createElement("li");

                    listItem.innerHTML =
                        '<i class="fa-solid fa-check"></i>' +
                        item;

                    planIncludes.appendChild(listItem);

                });

            }


            /* Update button */
            if (planAction) {
                planAction.innerHTML =
                    plan.button +
                    ' <i class="fa-solid fa-arrow-right"></i>';
            }

        });

    });

}


/* =========================================================
   WEEKLY MENU SWITCHER
========================================================= */

const menuDays = document.querySelectorAll(".menu-day");

const weeklyMenuImage =
    document.getElementById("weeklyMenuImage");

const weeklyMenuDay =
    document.getElementById("weeklyMenuDay");

const weeklyMenuTitle =
    document.getElementById("weeklyMenuTitle");

const weeklyMenuDescription =
    document.getElementById("weeklyMenuDescription");

const menuItemsContainer =
    document.querySelector(".menu-items");


if (menuDays.length > 0) {

    const weeklyMenus = {

        monday: {
            day: "MONDAY",
            image: "images/menu-monday.jpg",
            title: "South Indian Comfort Bowl",
            description:
                "A comforting combination of steamed rice, sambar, vegetable poriyal, rasam, curd and a traditional homemade side.",

            items: [
                ["fa-bowl-rice", "Steamed Rice"],
                ["fa-bowl-food", "Vegetable Sambar"],
                ["fa-leaf", "Fresh Poriyal"],
                ["fa-spoon", "Curd & Side"]
            ]
        },


        tuesday: {
            day: "TUESDAY",
            image: "images/menu-tuesday.jpg",
            title: "North Indian Homestyle Thali",
            description:
                "A hearty homestyle meal featuring fragrant rice, dal, seasonal vegetables, roti and a delicious homemade accompaniment.",

            items: [
                ["fa-bowl-rice", "Jeera Rice"],
                ["fa-bowl-food", "Dal Tadka"],
                ["fa-leaf", "Seasonal Sabzi"],
                ["fa-bread-slice", "Fresh Roti"]
            ]
        },


        wednesday: {
            day: "WEDNESDAY",
            image: "images/menu-wednesday.jpg",
            title: "Wholesome Millet Meal",
            description:
                "A balanced midweek meal featuring nutritious millet, fresh vegetables, comforting curry and a light homemade side.",

            items: [
                ["fa-seedling", "Healthy Millet"],
                ["fa-bowl-food", "Vegetable Curry"],
                ["fa-leaf", "Fresh Greens"],
                ["fa-spoon", "Homemade Side"]
            ]
        },


        thursday: {
            day: "THURSDAY",
            image: "images/menu-thursday.jpg",
            title: "Classic Home-Style Feast",
            description:
                "A satisfying home-style spread with rice, flavorful curry, seasonal vegetables and refreshing curd.",

            items: [
                ["fa-bowl-rice", "Steamed Rice"],
                ["fa-bowl-food", "Home-Style Curry"],
                ["fa-leaf", "Vegetable Poriyal"],
                ["fa-spoon", "Fresh Curd"]
            ]
        },


        friday: {
            day: "FRIDAY",
            image: "images/menu-friday.jpg",
            title: "Friday Special Thali",
            description:
                "End the week with a special homemade thali featuring aromatic rice, rich curry, fresh vegetables and a delightful dessert.",

            items: [
                ["fa-bowl-rice", "Special Rice"],
                ["fa-bowl-food", "Signature Curry"],
                ["fa-leaf", "Fresh Vegetables"],
                ["fa-ice-cream", "Sweet Treat"]
            ]
        },


        saturday: {
            day: "SATURDAY",
            image: "images/menu-saturday.jpg",
            title: "Weekend Comfort Meal",
            description:
                "A relaxed weekend meal packed with comforting flavours, wholesome ingredients and a satisfying homemade touch.",

            items: [
                ["fa-bowl-rice", "Flavoured Rice"],
                ["fa-bowl-food", "Special Gravy"],
                ["fa-leaf", "Vegetable Side"],
                ["fa-spoon", "Curd & Pickle"]
            ]
        },


        sunday: {
            day: "SUNDAY",
            image: "images/menu-sunday.jpg",
            title: "Sunday Family Special",
            description:
                "A generous Sunday meal created for slow, comforting moments with rich flavours and familiar home-cooked goodness.",

            items: [
                ["fa-bowl-rice", "Special Rice"],
                ["fa-bowl-food", "Sunday Curry"],
                ["fa-leaf", "Fresh Side Dish"],
                ["fa-cake-candles", "Weekend Dessert"]
            ]
        }

    };


    /* =====================================================
       DAY CLICK
    ===================================================== */

    menuDays.forEach(function (dayButton) {

        dayButton.addEventListener("click", function () {

            const selectedDay =
                dayButton.getAttribute("data-day");

            const menu =
                weeklyMenus[selectedDay];

            if (!menu) return;


            /* ---------------------------------------------
               Active Day
            --------------------------------------------- */

            menuDays.forEach(function (item) {
                item.classList.remove("active");
            });

            dayButton.classList.add("active");


            /* ---------------------------------------------
               Update Image
            --------------------------------------------- */

            if (weeklyMenuImage) {

                weeklyMenuImage.src = menu.image;
                weeklyMenuImage.alt = menu.title;

            }


            /* ---------------------------------------------
               Update Day
            --------------------------------------------- */

            if (weeklyMenuDay) {
                weeklyMenuDay.textContent = menu.day;
            }


            /* ---------------------------------------------
               Update Title
            --------------------------------------------- */

            if (weeklyMenuTitle) {
                weeklyMenuTitle.textContent = menu.title;
            }


            /* ---------------------------------------------
               Update Description
            --------------------------------------------- */

            if (weeklyMenuDescription) {
                weeklyMenuDescription.textContent =
                    menu.description;
            }


            /* ---------------------------------------------
               Update Food Items
            --------------------------------------------- */

            if (menuItemsContainer) {

                menuItemsContainer.innerHTML = "";

                menu.items.forEach(function (item) {

                    const menuItem =
                        document.createElement("div");

                    menuItem.className = "menu-item";

                    menuItem.innerHTML = `
                        <i class="fa-solid ${item[0]}"></i>
                        <span>${item[1]}</span>
                    `;

                    menuItemsContainer.appendChild(
                        menuItem
                    );

                });

            }

        });

    });

}

/* =========================================================
   LOGIN PASSWORD SHOW / HIDE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const passwordInput =
        document.getElementById("nouriva-login-password");

    const passwordEye =
        document.getElementById("nouriva-password-eye");


    if (passwordInput && passwordEye) {

        passwordEye.addEventListener("click", function () {

            const icon =
                passwordEye.querySelector("i");


            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");

                passwordEye.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                passwordInput.type = "password";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");

                passwordEye.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        });

    }

});


/* =========================================================
   MOBILE MENU TOGGLE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle =
        document.getElementById("menuToggle");

    const navWrapper =
        document.getElementById("navWrapper");


    if (!menuToggle || !navWrapper) return;


    /* Open / Close Menu */

    menuToggle.addEventListener("click", function () {

        const isOpen =
            navWrapper.classList.toggle("active");


        menuToggle.classList.toggle(
            "active",
            isOpen
        );


        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    /* Close menu after clicking a link */

    const navLinks =
        navWrapper.querySelectorAll(
            ".main-nav a"
        );


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 991) {

                navWrapper.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });


    /* Close when resized to desktop */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 991) {

                navWrapper.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

});
