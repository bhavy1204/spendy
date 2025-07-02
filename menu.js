import { addIncome } from './utils/income.js';

export const menu = async () => {

    let exit = false;
    while (!exit) {
        let res = await inquirer.prompt([{
            type: "list",
            message: "Choose one",
            name: "choice",
            choices: [
                "1. Add Expense",
                "2. Add Income",
                "3. View all expenses",
                "4. View all income",
                "5. View total",
                "6. Exit"
            ]
        }])

        if (res.choice === "1. Add Expense") {
            await addExpense();
        } else if (res.choice === "2. Add Income") {
            await addIncome();
        } else if (res.choice === "3. View all expenses") {

            if (expensesEntries.length === 0) {
                console.log("No entriess to show");
                await new Promise((r) => setTimeout(r, 1000));
                console.clear();
            }
            else
                await showAllExpenseEntries();

        } else if (res.choice === "4. View all income") {

            if (incomeEntries.length === 0) {
                console.log("No entriess to show");
                await new Promise((r) => setTimeout(r, 1000));
                console.clear();
            }
            else
                await showAllIncomeEntries();

        } else if (res.choice === "5. View total") {

            if (allEntries.length === 0) {
                console.log("No entriess to show");
                await new Promise((r) => setTimeout(r, 1000));
                console.clear();
            }
            else
                await showAllEntries();

        } else if (res.choice === "6. Exit") {
            exit = true;
        }
    }
}