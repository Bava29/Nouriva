/* =========================================================
   DASHBOARD WEEKLY MENU SWITCHER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const dayButtons =
        document.querySelectorAll(".dash-day-choice");

    const menuDetails =
        document.querySelectorAll(".dash-menu-detail");


    dayButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedDay =
                button.getAttribute("data-menu-day");


            /* Remove active */

            dayButtons.forEach(function (item) {

                item.classList.remove("active");

            });


            menuDetails.forEach(function (item) {

                item.classList.remove("active");

            });


            /* Add active */

            button.classList.add("active");


            const selectedMenu =
                document.querySelector(
                    '[data-menu-content="' +
                    selectedDay +
                    '"]'
                );


            if (selectedMenu) {

                selectedMenu.classList.add("active");

            }

        });

    });

});



/* =========================================================
   SUBSCRIPTION PAUSE DEMO
========================================================= */

const pauseSubscription =
    document.getElementById("dash-pause-plan");


if (pauseSubscription) {

    pauseSubscription.addEventListener("click", function () {

        const confirmPause =
            confirm(
                "Are you sure you want to pause your subscription?"
            );


        if (confirmPause) {

            pauseSubscription.innerHTML =
                '<i class="fa-solid fa-play"></i> Resume Subscription';

            pauseSubscription.classList.add(
                "subscription-paused"
            );

            alert(
                "Your subscription is now marked as paused."
            );

        }

    });

}


/* =========================================================
   D2 - MY MEAL PLANS INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       PREFERENCE BUTTONS
    ===================================================== */

    const preferenceButtons =
        document.querySelectorAll(".meal-choice");


    const previewCuisine =
        document.getElementById("preview-cuisine");

    const previewDiet =
        document.getElementById("preview-diet");

    const previewMeals =
        document.getElementById("preview-meals");


    preferenceButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const parent =
                button.closest(".meal-preference-group");


            parent
                .querySelectorAll(".meal-choice")
                .forEach(function (item) {

                    item.classList.remove("active");

                });


            button.classList.add("active");


            const selectedValue =
                button.getAttribute("data-choice");


            const heading =
                parent.querySelector("h3");


            if (!heading) return;


            const title =
                heading.textContent.trim();


            if (title === "Cuisine Style") {

                previewCuisine.textContent =
                    selectedValue;

            }


            if (title === "Dietary Preference") {

                previewDiet.textContent =
                    selectedValue;

            }


            if (title === "Meal Quantity") {

                previewMeals.textContent =
                    selectedValue + " / Week";

            }

        });

    });



    /* =====================================================
       SAVE PREFERENCES
    ===================================================== */

    const savePreferences =
        document.getElementById(
            "save-meal-preferences"
        );


    if (savePreferences) {

        savePreferences.addEventListener(
            "click",
            function () {

                const originalText =
                    savePreferences.innerHTML;


                savePreferences.innerHTML =
                    '<i class="fa-solid fa-check"></i> Preferences Saved';


                setTimeout(function () {

                    savePreferences.innerHTML =
                        originalText;

                }, 2200);

            }
        );

    }



    /* =====================================================
       MODIFY PLAN
    ===================================================== */

    const modifyPlan =
        document.getElementById(
            "open-plan-editor"
        );


    if (modifyPlan) {

        modifyPlan.addEventListener(
            "click",
            function () {

                const studio =
                    document.querySelector(
                        ".meal-preference-studio"
                    );


                if (studio) {

                    studio.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }



    /* =====================================================
       CHOOSE OTHER PLAN
    ===================================================== */

    const selectPlanButtons =
        document.querySelectorAll(
            ".meal-plan-select-btn"
        );


    selectPlanButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(
                        ".meal-plan-option"
                    );


                const planName =
                    card.querySelector("h3")
                        .textContent
                        .trim();


                const confirmChoice =
                    confirm(
                        "Switch your meal plan to " +
                        planName +
                        "?"
                    );


                if (confirmChoice) {

                    selectPlanButtons
                        .forEach(function (item) {

                            item.innerHTML =
                                'Choose This Plan <i class="fa-solid fa-arrow-right"></i>';

                        });


                    button.innerHTML =
                        '<i class="fa-solid fa-check"></i> Plan Selected';


                    button.style.background =
                        "var(--primary-color)";

                    button.style.borderColor =
                        "var(--primary-color)";

                    button.style.color =
                        "var(--white)";

                }

            }
        );

    });



    /* =====================================================
       CHANGE MEAL
    ===================================================== */

    const changeMealButtons =
        document.querySelectorAll(
            ".meal-schedule-change"
        );


    changeMealButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const mealItem =
                    button.closest(
                        ".meal-schedule-item"
                    );


                const mealName =
                    mealItem.querySelector(
                        ".meal-schedule-info h3"
                    );


                if (mealName) {

                    alert(
                        "Meal selection for \"" +
                        mealName.textContent.trim() +
                        "\" can be changed here."
                    );

                }

            }
        );

    });



    /* =====================================================
       SAVE WEEKLY PLAN
    ===================================================== */

    const saveWeeklyPlan =
        document.getElementById(
            "save-week-plan"
        );


    if (saveWeeklyPlan) {

        saveWeeklyPlan.addEventListener(
            "click",
            function () {

                const original =
                    saveWeeklyPlan.innerHTML;


                saveWeeklyPlan.innerHTML =
                    '<i class="fa-solid fa-check"></i> Weekly Plan Saved';


                setTimeout(function () {

                    saveWeeklyPlan.innerHTML =
                        original;

                }, 2200);

            }
        );

    }

});

/* =========================================================
   D3 - WEEKLY MENU INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       WEEKLY DAY SWITCHER
    ===================================================== */

    const dayButtons =
        document.querySelectorAll(".weekly-day-button");

    const dayPanels =
        document.querySelectorAll(".weekly-day-panel");


    dayButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedDay =
                button.getAttribute("data-day");


            /* Remove active from all buttons */

            dayButtons.forEach(function (item) {

                item.classList.remove("active");

            });


            /* Hide all day panels */

            dayPanels.forEach(function (panel) {

                panel.classList.remove("active");

            });


            /* Activate selected button */

            button.classList.add("active");


            /* Show selected panel */

            const selectedPanel =
                document.querySelector(
                    '[data-day-panel="' +
                    selectedDay +
                    '"]'
                );


            if (selectedPanel) {

                selectedPanel.classList.add("active");

            }


            /* Update nutrition day label */

            const dayLabel =
                button.querySelector("span");


            const nutritionLabel =
                document.querySelector(
                    ".weekly-nutrition-day"
                );


            const mealLabel =
                selectedPanel
                    ? selectedPanel.querySelector(
                        ".weekly-day-details > span"
                    )
                    : null;


            if (
                nutritionLabel &&
                dayLabel &&
                mealLabel
            ) {

                const mealText =
                    mealLabel.textContent
                        .trim()
                        .replace("·", "·");


                nutritionLabel.textContent =
                    mealText;

            }

        });

    });



    /* =====================================================
       VIEW MEAL BUTTON
    ===================================================== */

    const viewMealButtons =
        document.querySelectorAll(
            ".weekly-primary-action"
        );


    viewMealButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const panel =
                    button.closest(
                        ".weekly-day-panel"
                    );


                if (!panel) return;


                const mealTitle =
                    panel.querySelector(
                        ".weekly-day-details h3"
                    );


                if (!mealTitle) return;


                const nutritionSection =
                    document.querySelector(
                        ".weekly-nutrition-section"
                    );


                if (nutritionSection) {

                    nutritionSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });



    /* =====================================================
       CHANGE MEAL BUTTONS
    ===================================================== */

    const changeMealButtons =
        document.querySelectorAll(
            ".weekly-secondary-action"
        );


    changeMealButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const panel =
                    button.closest(
                        ".weekly-day-panel"
                    );


                if (!panel) return;


                const mealTitle =
                    panel.querySelector(
                        ".weekly-day-details h3"
                    );


                const mealName =
                    mealTitle
                        ? mealTitle.textContent.trim()
                        : "this meal";


                const changeMeal =
                    confirm(
                        "Would you like to change " +
                        mealName +
                        "?"
                    );


                if (changeMeal) {

                    button.innerHTML =
                        '<i class="fa-solid fa-check"></i> Change Requested';


                    button.style.borderColor =
                        "var(--primary-color)";

                    button.style.color =
                        "var(--primary-color)";

                }

            }
        );

    });



    /* =====================================================
       GLOBAL CHANGE MEAL BUTTON
    ===================================================== */

    const globalChangeMeal =
        document.getElementById(
            "weekly-change-meal"
        );


    if (globalChangeMeal) {

        globalChangeMeal.addEventListener(
            "click",
            function () {

                const activePanel =
                    document.querySelector(
                        ".weekly-day-panel.active"
                    );


                if (!activePanel) return;


                const changeButton =
                    activePanel.querySelector(
                        ".weekly-secondary-action"
                    );


                if (changeButton) {

                    changeButton.click();

                }

            }
        );

    }



    /* =====================================================
       SAVE WEEKLY CHOICES
    ===================================================== */

    const saveWeeklyMenu =
        document.getElementById(
            "weekly-save-menu"
        );


    if (saveWeeklyMenu) {

        saveWeeklyMenu.addEventListener(
            "click",
            function () {

                const originalText =
                    saveWeeklyMenu.innerHTML;


                saveWeeklyMenu.innerHTML =
                    '<i class="fa-solid fa-check"></i> Choices Saved';


                saveWeeklyMenu.disabled = true;


                setTimeout(function () {

                    saveWeeklyMenu.innerHTML =
                        originalText;

                    saveWeeklyMenu.disabled =
                        false;

                }, 2200);

            }
        );

    }



    /* =====================================================
       ACTIVE DAY ON PAGE LOAD
    ===================================================== */

    const initialDay =
        document.querySelector(
            ".weekly-day-button.active"
        );


    if (initialDay) {

        const initialDayName =
            initialDay.getAttribute("data-day");


        const initialPanel =
            document.querySelector(
                '[data-day-panel="' +
                initialDayName +
                '"]'
            );


        if (initialPanel) {

            dayPanels.forEach(function (panel) {

                panel.classList.remove("active");

            });


            initialPanel.classList.add("active");

        }

    }

});


/* =========================================================
   D4 - SUBSCRIPTION INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       SUBSCRIPTION DATA
    ===================================================== */

    const subscriptionData = {

        Weekly: {
            price: "₹1,199",
            period: "per week"
        },

        Monthly: {
            price: "₹4,299",
            period: "per month"
        },

        Quarterly: {
            price: "₹11,999",
            period: "per 3 months"
        }

    };


    /* =====================================================
       SUMMARY ELEMENTS
    ===================================================== */

    const summaryCycle =
        document.getElementById("summary-cycle");

    const summaryMeals =
        document.getElementById("summary-meals");

    const summaryDelivery =
        document.getElementById("summary-delivery");

    const summaryPrice =
        document.getElementById("summary-price");

    const summaryPeriod =
        document.getElementById("summary-period");



    /* =====================================================
       CURRENT SELECTIONS
    ===================================================== */

    let selectedCycle = "Weekly";
    let selectedMeals = "7 Meals";
    let selectedDelivery = "Every Day";



    /* =====================================================
       UPDATE LIVE SUMMARY
    ===================================================== */

    function updateSummary() {

        if (summaryCycle) {

            summaryCycle.textContent =
                selectedCycle;

        }


        if (summaryMeals) {

            summaryMeals.textContent =
                selectedMeals;

        }


        if (summaryDelivery) {

            summaryDelivery.textContent =
                selectedDelivery;

        }


        const plan =
            subscriptionData[selectedCycle];


        if (plan) {

            if (summaryPrice) {

                summaryPrice.textContent =
                    plan.price;

            }


            if (summaryPeriod) {

                summaryPeriod.textContent =
                    plan.period;

            }

        }

    }



    /* =====================================================
       BILLING CYCLE
    ===================================================== */

    const cycleButtons =
        document.querySelectorAll(
            "[data-cycle]"
        );


    cycleButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                cycleButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add("active");


                selectedCycle =
                    button.getAttribute(
                        "data-cycle"
                    );


                updateSummary();

            }
        );

    });



    /* =====================================================
       MEAL ALLOCATION
    ===================================================== */

    const mealButtons =
        document.querySelectorAll(
            "[data-meals]"
        );


    mealButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                mealButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add("active");


                selectedMeals =
                    button.getAttribute(
                        "data-meals"
                    );


                updateSummary();

            }
        );

    });



    /* =====================================================
       DELIVERY FREQUENCY
    ===================================================== */

    const deliveryButtons =
        document.querySelectorAll(
            "[data-delivery]"
        );


    deliveryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                deliveryButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add("active");


                selectedDelivery =
                    button.getAttribute(
                        "data-delivery"
                    );


                updateSummary();

            }
        );

    });



    /* =====================================================
       SWITCH SUBSCRIPTION PLAN
    ===================================================== */

    const planButtons =
        document.querySelectorAll(
            ".select-plan-button"
        );


    planButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedPlan =
                    button.getAttribute(
                        "data-plan"
                    );


                const confirmSwitch =
                    confirm(
                        "Switch your subscription to " +
                        selectedPlan +
                        "?"
                    );


                if (!confirmSwitch) {
                    return;
                }


                planButtons.forEach(
                    function (item) {

                        item.innerHTML =
                            'Switch to ' +
                            item.getAttribute(
                                "data-plan"
                            ) +
                            ' <i class="fa-solid fa-arrow-right"></i>';

                        item.style.background = "";
                        item.style.borderColor = "";
                        item.style.color = "";

                    }
                );


                button.innerHTML =
                    '<i class="fa-solid fa-check"></i> ' +
                    selectedPlan +
                    " Selected";


                button.style.background =
                    "var(--primary-color)";

                button.style.borderColor =
                    "var(--primary-color)";

                button.style.color =
                    "var(--white)";


                /* Update billing cycle */

                const matchingCycle =
                    document.querySelector(
                        '[data-cycle="' +
                        selectedPlan +
                        '"]'
                    );


                if (matchingCycle) {

                    cycleButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    matchingCycle.classList.add(
                        "active"
                    );


                    selectedCycle =
                        selectedPlan;


                    updateSummary();

                }

            }
        );

    });



    /* =====================================================
       CONFIRM SUBSCRIPTION CHANGES
    ===================================================== */

    const saveSubscription =
        document.getElementById(
            "save-subscription-settings"
        );


    if (saveSubscription) {

        saveSubscription.addEventListener(
            "click",
            function () {

                const originalContent =
                    saveSubscription.innerHTML;


                saveSubscription.innerHTML =
                    '<i class="fa-solid fa-check"></i> Changes Saved';


                saveSubscription.disabled =
                    true;


                setTimeout(
                    function () {

                        saveSubscription.innerHTML =
                            originalContent;

                        saveSubscription.disabled =
                            false;

                    },
                    2200
                );

            }
        );

    }



    /* =====================================================
       MANAGE SUBSCRIPTION
    ===================================================== */

    const manageSubscription =
        document.getElementById(
            "manage-subscription"
        );


    if (manageSubscription) {

        manageSubscription.addEventListener(
            "click",
            function () {

                const activitySection =
                    document.querySelector(
                        ".subscription-activity-section"
                    );


                if (activitySection) {

                    activitySection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }



    /* =====================================================
       AUTO RENEWAL
    ===================================================== */

    const autoRenewal =
        document.getElementById(
            "auto-renewal-toggle"
        );


    if (autoRenewal) {

        autoRenewal.addEventListener(
            "change",
            function () {

                const renewalPill =
                    document.querySelector(
                        ".subscription-renewal-pill"
                    );


                if (!renewalPill) {
                    return;
                }


                if (autoRenewal.checked) {

                    renewalPill.innerHTML =
                        '<i class="fa-solid fa-rotate"></i> Auto-renewal ON';

                } else {

                    renewalPill.innerHTML =
                        '<i class="fa-solid fa-pause"></i> Auto-renewal OFF';

                }

            }
        );

    }



    /* =====================================================
       PAUSE SUBSCRIPTION
    ===================================================== */

    const pauseSubscription =
        document.getElementById(
            "pause-subscription"
        );


    if (pauseSubscription) {

        pauseSubscription.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Are you sure you want to pause your subscription?"
                    );


                if (!confirmed) {
                    return;
                }


                pauseSubscription.innerHTML =
                    '<i class="fa-solid fa-check"></i> Subscription Paused';


                pauseSubscription.style.borderColor =
                    "var(--primary-color)";

                pauseSubscription.style.color =
                    "var(--primary-color)";


                const status =
                    document.querySelector(
                        ".subscription-status"
                    );


                if (status) {

                    status.innerHTML =
                        '<span></span> Paused';

                }

            }
        );

    }



    /* =====================================================
       CANCEL SUBSCRIPTION
    ===================================================== */

    const cancelSubscription =
        document.getElementById(
            "cancel-subscription"
        );


    if (cancelSubscription) {

        cancelSubscription.addEventListener(
            "click",
            function () {

                const firstConfirm =
                    confirm(
                        "Do you want to cancel your subscription?"
                    );


                if (!firstConfirm) {
                    return;
                }


                const finalConfirm =
                    confirm(
                        "This action will stop your automatic renewal. Continue?"
                    );


                if (!finalConfirm) {
                    return;
                }


                cancelSubscription.textContent =
                    "Cancellation Requested";


                cancelSubscription.style.color =
                    "var(--primary-color)";


                const status =
                    document.querySelector(
                        ".subscription-status"
                    );


                if (status) {

                    status.innerHTML =
                        '<span></span> Cancellation Pending';

                }

            }
        );

    }



    /* =====================================================
       PAYMENT METHOD CHANGE
    ===================================================== */

    const paymentChange =
        document.querySelector(
            ".subscription-management-item button"
        );


    if (paymentChange) {

        paymentChange.addEventListener(
            "click",
            function () {

                alert(
                    "Payment method management will be connected to the payment system."
                );

            }
        );

    }



    /* =====================================================
       INITIAL SUMMARY
    ===================================================== */

    updateSummary();

});

/* =========================================================
   D5 - BILLING & PAYMENTS
   FRONTEND INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       01. TRANSACTION FILTERS
    ===================================================== */

    const filterButtons = document.querySelectorAll(
        ".billing-filter"
    );

    const transactionRows = document.querySelectorAll(
        ".billing-transactions-table tbody tr"
    );


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            /* Remove active state */

            filterButtons.forEach(function (item) {

                item.classList.remove("active");

            });


            /* Add active state */

            button.classList.add("active");


            const selectedFilter =
                button.getAttribute("data-filter");


            transactionRows.forEach(function (row) {

                const rowStatus =
                    row.getAttribute("data-status");


                if (
                    selectedFilter === "all" ||
                    rowStatus === selectedFilter
                ) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        });

    });



    /* =====================================================
       02. PAY NOW
    ===================================================== */

    const payNowButton =
        document.getElementById("billing-pay-now");


    if (payNowButton) {

        payNowButton.addEventListener(
            "click",
            function () {

                const originalText =
                    payNowButton.innerHTML;


                payNowButton.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';


                payNowButton.disabled = true;


                setTimeout(function () {

                    payNowButton.innerHTML =
                        '<i class="fa-solid fa-check"></i> Payment Successful';


                    setTimeout(function () {

                        payNowButton.innerHTML =
                            originalText;

                        payNowButton.disabled =
                            false;

                    }, 2200);

                }, 1500);

            }
        );

    }



    /* =====================================================
       03. DOWNLOAD STATEMENT
    ===================================================== */

    const statementButton =
        document.getElementById(
            "billing-download-statement"
        );


    if (statementButton) {

        statementButton.addEventListener(
            "click",
            function () {

                const originalText =
                    statementButton.innerHTML;


                statementButton.innerHTML =
                    '<i class="fa-solid fa-check"></i> Ready';


                setTimeout(function () {

                    statementButton.innerHTML =
                        originalText;

                }, 1800);

            }
        );

    }



    /* =====================================================
       04. ADD PAYMENT METHOD
    ===================================================== */

    const addPaymentButton =
        document.getElementById(
            "add-payment-method"
        );


    const addPaymentCard =
        document.getElementById(
            "billing-add-method-card"
        );


    function openPaymentMethodMessage() {

        const choice =
            prompt(
                "Choose a payment method:\n\n1 - Credit / Debit Card\n2 - UPI\n\nEnter 1 or 2:"
            );


        if (choice === "1") {

            alert(
                "Card payment method setup will be connected to the payment gateway."
            );

        } else if (choice === "2") {

            alert(
                "UPI payment method setup will be connected to the payment gateway."
            );

        }

    }


    if (addPaymentButton) {

        addPaymentButton.addEventListener(
            "click",
            openPaymentMethodMessage
        );

    }


    if (addPaymentCard) {

        addPaymentCard.addEventListener(
            "click",
            openPaymentMethodMessage
        );

    }



    /* =====================================================
       05. PAYMENT CARD ACTIONS
    ===================================================== */

    const cardActionButtons =
        document.querySelectorAll(
            ".billing-card-actions button"
        );


    cardActionButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const buttonText =
                    button.textContent.trim();


                if (buttonText.includes("Edit")) {

                    alert(
                        "Card details editing will be connected to the payment gateway."
                    );

                }


                if (buttonText.includes("Primary")) {

                    button.innerHTML =
                        '<i class="fa-solid fa-check"></i> Primary';


                    button.style.color =
                        "var(--primary-color)";

                }


                if (buttonText.includes("Remove")) {

                    const removeCard =
                        confirm(
                            "Are you sure you want to remove this payment method?"
                        );


                    if (removeCard) {

                        const cardWrapper =
                            button.closest(
                                ".billing-card-wrapper"
                            );


                        if (cardWrapper) {

                            cardWrapper.style.opacity =
                                "0.45";


                            cardWrapper.style.pointerEvents =
                                "none";

                        }

                    }

                }

            }
        );

    });



    /* =====================================================
       06. UPI MANAGE
    ===================================================== */

    const upiManage =
        document.querySelector(
            ".billing-upi-card > button"
        );


    if (upiManage) {

        upiManage.addEventListener(
            "click",
            function () {

                alert(
                    "UPI management will be connected to the payment system."
                );

            }
        );

    }



    /* =====================================================
       07. VIEW INVOICE
    ===================================================== */

    const invoiceButtons =
        document.querySelectorAll(
            ".billing-invoice-button"
        );


    invoiceButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const invoiceNumber =
                    button.getAttribute(
                        "data-invoice"
                    );


                if (!invoiceNumber) {

                    alert(
                        "This payment is scheduled and the invoice will be available after payment."
                    );

                    return;

                }


                alert(
                    "Invoice " +
                    invoiceNumber +
                    " will open here when connected to the billing system."
                );

            }
        );

    });



    /* =====================================================
       08. VIEW ALL TRANSACTIONS
    ===================================================== */

    const viewAllTransactions =
        document.getElementById(
            "billing-view-all"
        );


    if (viewAllTransactions) {

        viewAllTransactions.addEventListener(
            "click",
            function () {

                alert(
                    "The complete transaction history will be loaded from the billing system."
                );

            }
        );

    }



    /* =====================================================
       09. DOWNLOAD INVOICE
    ===================================================== */

    const downloadInvoices =
        document.querySelectorAll(
            ".billing-download-invoice"
        );


    downloadInvoices.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const originalIcon =
                    button.innerHTML;


                button.innerHTML =
                    '<i class="fa-solid fa-check"></i>';


                button.style.background =
                    "var(--primary-color)";

                button.style.color =
                    "var(--white)";


                setTimeout(function () {

                    button.innerHTML =
                        originalIcon;

                    button.style.background =
                        "";

                    button.style.color =
                        "";

                }, 1800);

            }
        );

    });



    /* =====================================================
       10. VIEW ALL INVOICES
    ===================================================== */

    const allInvoices =
        document.getElementById(
            "billing-all-invoices"
        );


    if (allInvoices) {

        allInvoices.addEventListener(
            "click",
            function () {

                alert(
                    "All invoices will be displayed here once connected to the billing system."
                );

            }
        );

    }



    /* =====================================================
       11. BILLING PREFERENCE TOGGLES
    ===================================================== */

    const preferenceSwitches =
        document.querySelectorAll(
            ".billing-switch input"
        );


    preferenceSwitches.forEach(function (toggle) {

        toggle.addEventListener(
            "change",
            function () {

                const preferenceRow =
                    toggle.closest(
                        ".billing-preference-row"
                    );


                if (!preferenceRow) {
                    return;
                }


                const preferenceName =
                    preferenceRow.querySelector(
                        "strong"
                    );


                if (!preferenceName) {
                    return;
                }


                if (toggle.checked) {

                    console.log(
                        preferenceName.textContent.trim() +
                        " enabled"
                    );

                } else {

                    console.log(
                        preferenceName.textContent.trim() +
                        " disabled"
                    );

                }

            }
        );

    });



    /* =====================================================
       12. CONTACT BILLING SUPPORT
    ===================================================== */

    const supportButton =
        document.getElementById(
            "billing-contact-support"
        );


    if (supportButton) {

        supportButton.addEventListener(
            "click",
            function () {

                const originalText =
                    supportButton.innerHTML;


                supportButton.innerHTML =
                    '<i class="fa-solid fa-check"></i> Support Request Started';


                setTimeout(function () {

                    supportButton.innerHTML =
                        originalText;

                }, 2200);

            }
        );

    }



    /* =====================================================
       13. TRANSACTION TABLE EMPTY STATE
    ===================================================== */

    function checkTransactionResults() {

        const visibleRows =
            Array.from(transactionRows).filter(
                function (row) {

                    return row.style.display !== "none";

                }
            );


        const table =
            document.querySelector(
                ".billing-transactions-table"
            );


        if (!table) {
            return;
        }


        let emptyMessage =
            table.parentElement.querySelector(
                ".billing-empty-state"
            );


        if (
            visibleRows.length === 0
        ) {

            if (!emptyMessage) {

                emptyMessage =
                    document.createElement("div");

                emptyMessage.className =
                    "billing-empty-state";

                emptyMessage.innerHTML =
                    `
                    <i class="fa-regular fa-folder-open"></i>
                    <strong>No transactions found</strong>
                    <span>There are no payments in this category.</span>
                    `;

                table.parentElement.appendChild(
                    emptyMessage
                );

            }

        } else {

            if (emptyMessage) {

                emptyMessage.remove();

            }

        }

    }


    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            checkTransactionResults
        );

    });



    /* =====================================================
       14. PAYMENT METHOD HOVER EFFECT
    ===================================================== */

    const paymentMethods =
        document.querySelectorAll(
            ".billing-upi-card, .billing-add-method"
        );


    paymentMethods.forEach(function (method) {

        method.addEventListener(
            "mouseenter",
            function () {

                method.style.transform =
                    "translateY(-3px)";

            }
        );


        method.addEventListener(
            "mouseleave",
            function () {

                method.style.transform =
                    "";

            }
        );

    });



    /* =====================================================
       INITIAL STATE
    ===================================================== */

    const defaultFilter =
        document.querySelector(
            '.billing-filter[data-filter="all"]'
        );


    if (defaultFilter) {

        defaultFilter.classList.add(
            "active"
        );

    }

});


/* =========================================================
   D6 - DELIVERY DETAILS
   FRONTEND INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       01. DELIVERY DAY SELECTION
    ===================================================== */

    const deliveryDays =
        document.querySelectorAll(".delivery-day");


    deliveryDays.forEach(function (day) {

        day.addEventListener("click", function () {

            day.classList.toggle("active");

        });

    });



    /* =====================================================
       02. DELIVERY TIME SELECTION
    ===================================================== */

    const deliveryTimes =
        document.querySelectorAll(
            ".delivery-time-option"
        );


    deliveryTimes.forEach(function (time) {

        time.addEventListener("click", function () {

            deliveryTimes.forEach(function (item) {

                item.classList.remove("active");

            });


            time.classList.add("active");

        });

    });



    /* =====================================================
       03. SAVE DELIVERY PREFERENCES
    ===================================================== */

    const savePreferences =
        document.getElementById(
            "save-delivery-preferences"
        );


    if (savePreferences) {

        savePreferences.addEventListener(
            "click",
            function () {

                const originalText =
                    savePreferences.innerHTML;


                savePreferences.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';


                savePreferences.disabled = true;


                setTimeout(function () {

                    savePreferences.innerHTML =
                        '<i class="fa-solid fa-check"></i> Preferences Saved';


                    const savedLabel =
                        document.querySelector(
                            ".delivery-saved-label"
                        );


                    if (savedLabel) {

                        savedLabel.innerHTML =
                            '<i class="fa-solid fa-circle-check"></i> Preferences saved';

                    }


                    setTimeout(function () {

                        savePreferences.innerHTML =
                            originalText;

                        savePreferences.disabled =
                            false;

                    }, 2000);

                }, 900);

            }
        );

    }



    /* =====================================================
       04. DELIVERY INSTRUCTIONS
    ===================================================== */

    const instructions =
        document.getElementById(
            "delivery-instructions"
        );


    if (instructions) {

        instructions.addEventListener(
            "input",
            function () {

                const maxLength = 250;


                if (
                    instructions.value.length >
                    maxLength
                ) {

                    instructions.value =
                        instructions.value.substring(
                            0,
                            maxLength
                        );

                }

            }
        );

    }



    /* =====================================================
       05. TRACK DELIVERY
    ===================================================== */

    const trackDelivery =
        document.getElementById(
            "track-delivery"
        );


    if (trackDelivery) {

        trackDelivery.addEventListener(
            "click",
            function () {

                const originalText =
                    trackDelivery.innerHTML;


                trackDelivery.innerHTML =
                    '<i class="fa-solid fa-location-crosshairs"></i> Locating...';


                trackDelivery.disabled =
                    true;


                setTimeout(function () {

                    trackDelivery.innerHTML =
                        '<i class="fa-solid fa-truck"></i> Driver is preparing your delivery';


                    setTimeout(function () {

                        trackDelivery.innerHTML =
                            originalText;

                        trackDelivery.disabled =
                            false;

                    }, 2500);

                }, 1000);

            }
        );

    }



    /* =====================================================
       06. MODIFY DELIVERY
    ===================================================== */

    const modifyDelivery =
        document.getElementById(
            "modify-delivery"
        );


    if (modifyDelivery) {

        modifyDelivery.addEventListener(
            "click",
            function () {

                const scheduleSection =
                    document.querySelector(
                        ".delivery-schedule-section"
                    );


                if (scheduleSection) {

                    scheduleSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }



    /* =====================================================
       07. ADD NEW ADDRESS
    ===================================================== */

    const addAddress =
        document.getElementById(
            "add-address"
        );


    if (addAddress) {

        addAddress.addEventListener(
            "click",
            function () {

                const address =
                    prompt(
                        "Enter your new delivery address:"
                    );


                if (
                    address &&
                    address.trim() !== ""
                ) {

                    alert(
                        "New address added successfully.\n\n" +
                        address
                    );

                }

            }
        );

    }



    /* =====================================================
       08. EDIT ADDRESS
    ===================================================== */

    const editAddress =
        document.querySelector(
            ".edit-address"
        );


    if (editAddress) {

        editAddress.addEventListener(
            "click",
            function () {

                alert(
                    "Address editing form will open here when connected to the backend."
                );

            }
        );

    }



    /* =====================================================
       09. CHANGE ADDRESS
    ===================================================== */

    const changeAddress =
        document.querySelector(
            ".change-address"
        );


    if (changeAddress) {

        changeAddress.addEventListener(
            "click",
            function () {

                alert(
                    "Your saved delivery addresses will appear here."
                );

            }
        );

    }



    /* =====================================================
       10. DELIVERY OPTION SWITCHES
    ===================================================== */

    const deliverySwitches =
        document.querySelectorAll(
            ".delivery-switch input"
        );


    deliverySwitches.forEach(function (toggle) {

        toggle.addEventListener(
            "change",
            function () {

                const optionRow =
                    toggle.closest(
                        ".delivery-option-row"
                    );


                if (!optionRow) {
                    return;
                }


                const optionName =
                    optionRow.querySelector(
                        "strong"
                    );


                if (!optionName) {
                    return;
                }


                if (toggle.checked) {

                    console.log(
                        optionName.textContent.trim() +
                        " enabled"
                    );

                } else {

                    console.log(
                        optionName.textContent.trim() +
                        " disabled"
                    );

                }

            }
        );

    });



    /* =====================================================
       11. VIEW ALL DELIVERIES
    ===================================================== */

    const viewAllDeliveries =
        document.getElementById(
            "view-all-deliveries"
        );


    if (viewAllDeliveries) {

        viewAllDeliveries.addEventListener(
            "click",
            function () {

                alert(
                    "Your complete delivery history will be loaded here."
                );

            }
        );

    }



    /* =====================================================
       12. DELIVERY HISTORY DETAILS
    ===================================================== */

    const historyButtons =
        document.querySelectorAll(
            ".delivery-view-details"
        );


    historyButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const historyItem =
                    button.closest(
                        ".delivery-history-item"
                    );


                if (!historyItem) {
                    return;
                }


                const deliveryName =
                    historyItem.querySelector(
                        ".delivery-history-info strong"
                    );


                const deliveryDetails =
                    historyItem.querySelector(
                        ".delivery-history-info span"
                    );


                const name =
                    deliveryName
                        ? deliveryName.textContent.trim()
                        : "Delivery";


                const details =
                    deliveryDetails
                        ? deliveryDetails.textContent.trim()
                        : "";


                alert(
                    name +
                    "\n\n" +
                    details +
                    "\n\nStatus: Delivered"
                );

            }
        );

    });



    /* =====================================================
       13. CONTACT DELIVERY SUPPORT
    ===================================================== */

    const contactSupport =
        document.getElementById(
            "delivery-contact-support"
        );


    if (contactSupport) {

        contactSupport.addEventListener(
            "click",
            function () {

                const originalText =
                    contactSupport.innerHTML;


                contactSupport.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Connecting...';


                contactSupport.disabled =
                    true;


                setTimeout(function () {

                    contactSupport.innerHTML =
                        '<i class="fa-solid fa-check"></i> Support Request Started';


                    setTimeout(function () {

                        contactSupport.innerHTML =
                            originalText;

                        contactSupport.disabled =
                            false;

                    }, 2200);

                }, 1000);

            }
        );

    }



    /* =====================================================
       14. DELIVERY PROGRESS ANIMATION
    ===================================================== */

    const progressFill =
        document.querySelector(
            ".delivery-progress-fill"
        );


    if (progressFill) {

        progressFill.style.width = "0";


        setTimeout(function () {

            progressFill.style.width = "50%";

        }, 400);

    }



    /* =====================================================
       15. DEFAULT DELIVERY STATUS
    ===================================================== */

    const confirmedStatus =
        document.querySelector(
            ".delivery-confirmed-status"
        );


    if (confirmedStatus) {

        confirmedStatus.setAttribute(
            "title",
            "Your next delivery is confirmed"
        );

    }



    /* =====================================================
       16. DISABLE DOUBLE CLICK ON ACTION BUTTONS
    ===================================================== */

    const actionButtons =
        document.querySelectorAll(
            ".delivery-save-button, " +
            "#track-delivery, " +
            "#delivery-contact-support"
        );


    actionButtons.forEach(function (button) {

        button.addEventListener(
            "dblclick",
            function (event) {

                event.preventDefault();

            }
        );

    });


});

/* =========================================================
   D7 - ACCOUNT SETTINGS
   FRONTEND INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       01. PROFILE IMAGE CHANGE
    ===================================================== */

    const changeProfileImage =
        document.getElementById("change-profile-image");

    const profileImages =
        document.querySelectorAll(
            ".account-profile-image img"
        );


    if (changeProfileImage) {

        changeProfileImage.addEventListener(
            "click",
            function () {

                const fileInput =
                    document.createElement("input");

                fileInput.type = "file";
                fileInput.accept = "image/*";


                fileInput.addEventListener(
                    "change",
                    function () {

                        const file =
                            fileInput.files[0];


                        if (!file) {
                            return;
                        }


                        if (!file.type.startsWith("image/")) {

                            alert(
                                "Please select a valid image."
                            );

                            return;

                        }


                        const imageURL =
                            URL.createObjectURL(file);


                        profileImages.forEach(
                            function (image) {

                                image.src = imageURL;

                            }
                        );

                    }
                );


                fileInput.click();

            }
        );

    }



    /* =====================================================
       02. SAVE PROFILE
    ===================================================== */

    const saveProfile =
        document.getElementById("save-profile");


    if (saveProfile) {

        saveProfile.addEventListener(
            "click",
            function () {

                const name =
                    document.getElementById(
                        "account-name"
                    );

                const email =
                    document.getElementById(
                        "account-email"
                    );

                const phone =
                    document.getElementById(
                        "account-phone"
                    );


                if (!name.value.trim()) {

                    alert(
                        "Please enter your full name."
                    );

                    name.focus();

                    return;

                }


                if (
                    !email.value.trim() ||
                    !email.validity.valid
                ) {

                    alert(
                        "Please enter a valid email address."
                    );

                    email.focus();

                    return;

                }


                if (!phone.value.trim()) {

                    alert(
                        "Please enter your phone number."
                    );

                    phone.focus();

                    return;

                }


                const originalText =
                    saveProfile.innerHTML;


                saveProfile.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

                saveProfile.disabled = true;


                setTimeout(function () {

                    saveProfile.innerHTML =
                        '<i class="fa-solid fa-check"></i> Changes Saved';


                    setTimeout(function () {

                        saveProfile.innerHTML =
                            originalText;

                        saveProfile.disabled =
                            false;

                    }, 1800);

                }, 900);

            }
        );

    }



    /* =====================================================
       03. PASSWORD SHOW / HIDE
    ===================================================== */

    const passwordToggles =
        document.querySelectorAll(
            ".account-password-toggle"
        );


    passwordToggles.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const targetId =
                    button.getAttribute(
                        "data-target"
                    );


                const passwordInput =
                    document.getElementById(
                        targetId
                    );


                const icon =
                    button.querySelector("i");


                if (!passwordInput) {
                    return;
                }


                if (
                    passwordInput.type ===
                    "password"
                ) {

                    passwordInput.type =
                        "text";


                    icon.classList.remove(
                        "fa-eye"
                    );

                    icon.classList.add(
                        "fa-eye-slash"
                    );

                } else {

                    passwordInput.type =
                        "password";


                    icon.classList.remove(
                        "fa-eye-slash"
                    );

                    icon.classList.add(
                        "fa-eye"
                    );

                }

            }
        );

    });



    /* =====================================================
       04. CHANGE PASSWORD
    ===================================================== */

    const changePassword =
        document.getElementById(
            "change-password"
        );


    if (changePassword) {

        changePassword.addEventListener(
            "click",
            function () {

                const currentPassword =
                    document.getElementById(
                        "current-password"
                    );

                const newPassword =
                    document.getElementById(
                        "new-password"
                    );

                const confirmPassword =
                    document.getElementById(
                        "confirm-password"
                    );


                if (!currentPassword.value) {

                    alert(
                        "Please enter your current password."
                    );

                    currentPassword.focus();

                    return;

                }


                if (
                    newPassword.value.length <
                    8
                ) {

                    alert(
                        "New password must contain at least 8 characters."
                    );

                    newPassword.focus();

                    return;

                }


                if (
                    newPassword.value !==
                    confirmPassword.value
                ) {

                    alert(
                        "New password and confirm password do not match."
                    );

                    confirmPassword.focus();

                    return;

                }


                if (
                    currentPassword.value ===
                    newPassword.value
                ) {

                    alert(
                        "New password should be different from your current password."
                    );

                    newPassword.focus();

                    return;

                }


                const originalText =
                    changePassword.innerHTML;


                changePassword.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Updating...';

                changePassword.disabled =
                    true;


                setTimeout(function () {

                    changePassword.innerHTML =
                        '<i class="fa-solid fa-check"></i> Password Updated';


                    currentPassword.value = "";
                    newPassword.value = "";
                    confirmPassword.value = "";


                    setTimeout(function () {

                        changePassword.innerHTML =
                            originalText;

                        changePassword.disabled =
                            false;

                    }, 2000);

                }, 1000);

            }
        );

    }



    /* =====================================================
       05. PASSWORD STRENGTH
    ===================================================== */

    const newPassword =
        document.getElementById(
            "new-password"
        );


    if (newPassword) {

        newPassword.addEventListener(
            "input",
            function () {

                const value =
                    newPassword.value;


                if (!value) {

                    newPassword.style.borderColor =
                        "";

                    return;

                }


                if (value.length < 8) {

                    newPassword.style.borderColor =
                        "#b87970";

                } else {

                    newPassword.style.borderColor =
                        "var(--primary-color)";

                }

            }
        );

    }



    /* =====================================================
       06. NOTIFICATION SWITCHES
    ===================================================== */

    const preferenceSwitches =
        document.querySelectorAll(
            ".account-switch input"
        );


    preferenceSwitches.forEach(function (toggle) {

        toggle.addEventListener(
            "change",
            function () {

                const parent =
                    toggle.closest(
                        ".account-preference-header, " +
                        ".account-preference-row"
                    );


                if (!parent) {
                    return;
                }


                const title =
                    parent.querySelector(
                        "strong"
                    );


                if (!title) {
                    return;
                }


                if (toggle.checked) {

                    console.log(
                        title.textContent.trim() +
                        " enabled"
                    );

                } else {

                    console.log(
                        title.textContent.trim() +
                        " disabled"
                    );

                }

            }
        );

    });



    /* =====================================================
       07. LANGUAGE CHANGE
    ===================================================== */

    const languageSelect =
        document.getElementById(
            "account-language"
        );


    if (languageSelect) {

        languageSelect.addEventListener(
            "change",
            function () {

                const selectedLanguage =
                    languageSelect.value;


                if (
                    selectedLanguage ===
                    "ta"
                ) {

                    alert(
                        "Tamil language preference selected."
                    );

                } else {

                    alert(
                        "English language preference selected."
                    );

                }

            }
        );

    }



    /* =====================================================
       08. LOGOUT
    ===================================================== */

    const logoutButton =
        document.getElementById(
            "account-logout"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to log out?"
                    );


                if (!confirmLogout) {
                    return;
                }


                logoutButton.innerHTML =
                    '<span><i class="fa-solid fa-spinner fa-spin"></i> Logging out...</span>';


                logoutButton.disabled =
                    true;


                setTimeout(function () {

                    window.location.href =
                        "login.html";

                }, 1000);

            }
        );

    }



    /* =====================================================
       09. DELETE ACCOUNT
    ===================================================== */

    const deleteAccount =
        document.getElementById(
            "delete-account"
        );


    if (deleteAccount) {

        deleteAccount.addEventListener(
            "click",
            function () {

                const firstConfirm =
                    confirm(
                        "Are you sure you want to delete your Nouriva account?"
                    );


                if (!firstConfirm) {
                    return;
                }


                const secondConfirm =
                    confirm(
                        "This action cannot be easily undone. Do you really want to continue?"
                    );


                if (!secondConfirm) {
                    return;
                }


                alert(
                    "Your account deletion request has been submitted."
                );

            }
        );

    }



    /* =====================================================
       10. PROFILE INPUT UPDATE
    ===================================================== */

    const accountName =
        document.getElementById(
            "account-name"
        );


    const profileName =
        document.querySelector(
            ".account-profile-image-card > strong"
        );


    if (
        accountName &&
        profileName
    ) {

        accountName.addEventListener(
            "input",
            function () {

                if (
                    accountName.value.trim()
                ) {

                    profileName.textContent =
                        accountName.value.trim();

                }

            }
        );

    }



    /* =====================================================
       11. SECURITY STATUS
    ===================================================== */

    const securityStatus =
        document.querySelector(
            ".account-security-status"
        );


    if (securityStatus) {

        securityStatus.setAttribute(
            "title",
            "Your account security is active"
        );

    }



    /* =====================================================
       12. PREVENT DOUBLE CLICK
    ===================================================== */

    const actionButtons =
        document.querySelectorAll(
            "#save-profile, " +
            "#change-password, " +
            "#account-logout, " +
            "#delete-account"
        );


    actionButtons.forEach(function (button) {

        button.addEventListener(
            "dblclick",
            function (event) {

                event.preventDefault();

            }
        );

    });


});

/* =====================================================
   SIDEBAR LOGOUT - CUSTOM CENTER POPUP
===================================================== */

const sidebarLogout = document.querySelector(
    ".nouriva-dashboard-logout"
);

if (sidebarLogout) {

    sidebarLogout.addEventListener("click", function (e) {

        e.preventDefault();

        const logoutPopup = document.createElement("div");

        logoutPopup.className = "nouriva-logout-popup-overlay";

        logoutPopup.innerHTML = `
            
            <div class="nouriva-logout-popup-box">

                <div class="nouriva-logout-popup-icon">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </div>

                <h3>
                    Logout
                </h3>

                <p>
                    Are you sure you want to log out?
                </p>

                <div class="nouriva-logout-popup-buttons">

                    <button
                        type="button"
                        class="nouriva-logout-no">

                        No

                    </button>

                    <button
                        type="button"
                        class="nouriva-logout-yes">

                        Yes

                    </button>

                </div>

            </div>

        `;

        document.body.appendChild(logoutPopup);


        /* -----------------------------------------
           NO BUTTON
        ----------------------------------------- */

        const noButton =
            logoutPopup.querySelector(
                ".nouriva-logout-no"
            );

        noButton.addEventListener("click", function () {

            logoutPopup.classList.remove("show");

            setTimeout(function () {

                logoutPopup.remove();

            }, 250);

        });


        /* -----------------------------------------
           YES BUTTON
        ----------------------------------------- */

        const yesButton =
            logoutPopup.querySelector(
                ".nouriva-logout-yes"
            );

        yesButton.addEventListener("click", function () {

            yesButton.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Logging out...';

            yesButton.disabled = true;


            setTimeout(function () {

                window.location.href =
                    "login.html";

            }, 800);

        });


        /* Show popup */

        setTimeout(function () {

            logoutPopup.classList.add("show");

        }, 10);

    });

}

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
        "#dashboard-theme-toggle",
        "[data-dashboard-action=\"theme\"]",
        "[data-theme-toggle]",
        "[aria-label*=\"Dark\"]",
        "[aria-label*=\"dark\"]"
    ].join(", ");

    const directionButtonsSelector = [
        "#dashboard-rtl-toggle",
        "[data-dashboard-action=\"rtl\"]",
        "[data-rtl-toggle]",
        "[aria-label*=\"RTL\"]",
        "[aria-label*=\"Rtl\"]"
    ].join(", ");

    const logoSelector = [
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
   NOURIVA DASHBOARD MOBILE SIDEBAR MENU
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle =
        document.getElementById("dashboard-menu-toggle");

    const sidebar =
        document.querySelector(".nouriva-dashboard-sidebar");

    const sidebarClose =
        document.getElementById("dashboard-sidebar-close");

    const overlay =
        document.getElementById("dashboard-sidebar-overlay");

    const menuLinks =
        document.querySelectorAll(
            ".nouriva-dashboard-nav-link"
        );


    /* OPEN */

    function openDashboardMenu() {

        if (!sidebar || !overlay) return;

        sidebar.classList.add("menu-open");

        overlay.classList.add("menu-open");

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

        }

        document.body.style.overflow = "hidden";

    }


    /* CLOSE */

    function closeDashboardMenu() {

        if (!sidebar || !overlay) return;

        sidebar.classList.remove("menu-open");

        overlay.classList.remove("menu-open");

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        document.body.style.overflow = "";

    }


    /* HAMBURGER */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            openDashboardMenu
        );

    }


    /* CLOSE */

    if (sidebarClose) {

        sidebarClose.addEventListener(
            "click",
            closeDashboardMenu
        );

    }


    /* OVERLAY */

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeDashboardMenu
        );

    }


    /* CLOSE AFTER MENU CLICK */

    menuLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeDashboardMenu();

            }
        );

    });


    /* ESC KEY */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeDashboardMenu();

            }

        }
    );


    /* RESET WHEN RESIZING TO DESKTOP */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 1199) {

                closeDashboardMenu();

            }

        }
    );

});
