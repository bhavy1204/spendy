import inquirer from 'inquirer';
import { state } from '../store/data';
import pauseAndWait from './pauseAndClear';


export const addIncome = async () => {
    const amountRes = await inquirer.prompt([{
        type: "number",
        name: "amount",
        message: "Enter your income : ",
    }]);
    if (amountRes.amount <= 0) {
        console.error("Not valid amount");
        pauseAndWait();
    } else {
        let createdAt = new Date().toLocaleString();
        let noteRes = await inquirer.prompt([{
            message: "Add note : ",
            name: "note",
            type: "input"
        }])
        state.totalBalance += amountRes.amount;
        allEntries.push({ amount: amountRes.amount, note: noteRes.note, createdAt: createdAt });
        incomeEntries.push({ amount: amountRes.amount, note: noteRes.note, createdAt: createdAt });
        console.log("Entry added successfully");
        await new Promise(r => setTimeout(r, 1000));
        console.clear();
    }
}