import { state } from "../store/data";
import inquirer from "inquirer";


export const addExpense = async () => {
    if (state.totalBalance <= 0) {
        console.error("Insufficient balance");
        await new Promise(r => setTimeout(r, 1000));
        console.clear();
        return;
    }
    const amountRes = await inquirer.prompt([{
        type: "number",
        name: "amount",
        message: "Enter your expense : ",
    }]);
    if (amountRes.amount <= 0) {
        console.error("Not valid amount");
        await new Promise(r => setTimeout(r, 1000));
        console.clear();
    }
    else if (amountRes.amount > state.totalBalance) {
        console.log("amount greater than total amount");
        await new Promise((r) => setTimeout(r, 1000));
        console.clear();
    }
    else {
        let createdAt = new Date().toLocaleString();
        let noteRes = await inquirer.prompt([{
            message: "Add note : ",
            name: "note",
            type: "input"
        }])
        state.totalBalance -= amountRes.amount;
        allEntries.push({ amount: amountRes.amount, note: noteRes.note, createdAt: createdAt });
        expensesEntries.push({ amount: amountRes.amount, note: noteRes.note, createdAt: createdAt });
        console.log("Entry added successfully");
        await new Promise(r => setTimeout(r, 1000));
        console.clear();
    }
}