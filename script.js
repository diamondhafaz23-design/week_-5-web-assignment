// =========================================================================
// STEP 1: LINKED AND EXECUTED
// =========================================================================
console.log("✅ script.js has been successfully linked to the HTML document.");

// =========================================================================
// STEP 2: CREATE VARIABLES TO STORE BUDGETING INFORMATION
// =========================================================================
const appName = "SpendWise";
let baseBudget = 50000;
let initialExpenseName = "Lunch";
let initialExpenseAmount = 500;

// =========================================================================
// STEP 3: COLLECT USER INPUT
// =========================================================================
let budgetInput = Number(
    prompt("💰 Welcome to SpendWise! Please enter your Monthly Budget amount (KSh):", "20000")
);

let expenseInput = Number(
    prompt("💸 Please enter your total current Expense amount (KSh):", "1208")
);

// =========================================================================
// STEP 4: CALCULATE THE BALANCE
// =========================================================================
let remaining = budgetInput - expenseInput;

// =========================================================================
// STEP 5: CREATE REUSABLE FUNCTIONS
// =========================================================================
function calculateBalance(budget, expense) {
    return budget - expense;
}

function calculateWeeklyBudget(monthlyBudget) {
    return monthlyBudget / 4;
}

// =========================================================================
// STEP 6: STORE RETURNED RESULTS INSIDE VARIABLES
// =========================================================================
let balance = calculateBalance(budgetInput, expenseInput);
let weeklyBudget = calculateWeeklyBudget(budgetInput);

// =========================================================================
// STEP 7: DISPLAY ALL RESULTS IN THE CONSOLE
// =========================================================================
function logDashboardMetrics() {
    console.log("=== 📈 SPENDWISE FINANCIAL REPORT ===");
    console.log("Application Name  :", appName);
    console.log("Assigned Budget   :", budgetInput, "KSh");
    console.log("Total Expense Log :", expenseInput, "KSh");
    console.log("-------------------------------------");
    console.log("Remaining Balance :", balance, "KSh");
    console.log("Weekly Budget Cap :", weeklyBudget, "KSh");
    console.log("=====================================");
}
logDashboardMetrics();

// =========================================================================
// DASHBOARD VIEW INTERACTIVE BINDING ENGINE
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const totalSpentDisplay = document.querySelector('.value-total');
    const countDisplay = document.querySelector('.value-count');
    const submitButton = document.querySelector('.btn-primary');
    const transactionTableBody = document.querySelector('.transaction-table tbody');

    // Display starting totals entered during step 3 prompts
    if (totalSpentDisplay) totalSpentDisplay.textContent = `KSh ${expenseInput.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    
    let totalItemsCounter = 5; // Starting layout count matches HTML framework row amount
    if (countDisplay) countDisplay.textContent = `${totalItemsCounter} Items`;

    if (submitButton && transactionTableBody) {
        submitButton.addEventListener('click', () => {
            const nameInput = document.getElementById('expense-name');
            const amountInput = document.getElementById('expense-amount');
            const categoryInput = document.getElementById('expense-category');
            const dateInput = document.getElementById('expense-date');

            const nameValue = nameInput.value.trim();
            const amountValue = parseFloat(amountInput.value);
            const categoryValue = categoryInput.value;
            const dateValue = dateInput.value;

            // Simple validation catch block to stop empty submissions
            if (nameValue === "" || isNaN(amountValue) || dateValue === "") {
                alert("⚠️ Please fill out all input fields before adding an expense.");
                return;
            }

            // Adjust live running tally math calculations safely
            expenseInput += amountValue;
            balance = calculateBalance(budgetInput, expenseInput);
            totalItemsCounter += 1;

            // Paint metrics back onto user screen container components
            if (totalSpentDisplay) totalSpentDisplay.textContent = `KSh ${expenseInput.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
            if (countDisplay) countDisplay.textContent = `${totalItemsCounter} Items`;

            // Log updated calculation matrix data directly to console log streams
            logDashboardMetrics();

            // Build fresh table row markup blocks seamlessly
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${nameValue}</td>
                <td>KSh ${amountValue.toFixed(2)}</td>
                <td><span class="tag tag-${categoryValue.toLowerCase()}">${categoryValue}</span></td>
                <td>${dateValue}</td>
                <td><button type="button" class="btn-delete">Delete</button></td>
            `;
            transactionTableBody.appendChild(newRow);

            // Clean input boxes out for user experience
            nameInput.value = "";
            amountInput.value = "";
        });

        // Set up event delegation to remove individual data table items on click
        transactionTableBody.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-delete')) {
                const structuralRow = e.target.closest('tr');
                
                // Extract price amount to deduct from text column cell
                const amountCellText = structuralRow.cells[1].textContent.replace(/[^0-9.]/g, '');
                const numericAmount = parseFloat(amountCellText) || 0;

                // Adjust tracking metrics down safely
                expenseInput = Math.max(0, expenseInput - numericAmount);
                balance = calculateBalance(budgetInput, expenseInput);
                totalItemsCounter = Math.max(0, totalItemsCounter - 1);

                // Update text elements on interface cards
                if (totalSpentDisplay) totalSpentDisplay.textContent = `KSh ${expenseInput.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
                if (countDisplay) countDisplay.textContent = `${totalItemsCounter} Items`;

                logDashboardMetrics();
                structuralRow.remove();
            }
        });
    }
});
