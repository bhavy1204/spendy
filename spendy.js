#!/usr/bin/env node

import inquirer from 'inquirer';
import { validate } from 'uuid';

let total = 0;

let allEntries = [];

// Function to add expenses ---------------------------------------------------------------------------------
const addExpense = async () => {
    if (total <= 0) {
        console.error("not possible amount zero");
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
    } else {
        let createdAt = new Date().toLocaleString();
        let noteRes = await inquirer.prompt([{
            message: "Add note : ",
            name: "note",
            type: "input"
        }])
        total -= amountRes.amount;
        allEntries.push({ amount: amountRes.amount, note: noteRes.note, createdAt: createdAt });
        console.log("Entry added successfully");
        await new Promise(r => setTimeout(r, 1000));
        console.clear();
    }
}

// funnction to add Income --------------------------------------------------------------------------------------------
const addIncome = async () => {
    const amountRes = await inquirer.prompt([{
        type: "number",
        name: "amount",
        message: "Enter your income : ",
    }]);
    if (amountRes.amount <= 0) {
        console.error("Not valid amount");
        await new Promise(r => setTimeout(r, 2000));
        console.clear();
    } else {
        let createdAt = new Date().toLocaleString();
        let noteRes = await inquirer.prompt([{
            message: "Add note : ",
            name: "note",
            type: "input"
        }])
        total += amountRes.amount;
        allEntries.push({ amount: amountRes.amount, note: noteRes.note, createdAt: createdAt });
        console.log("Entry added successfully");
        await new Promise(r => setTimeout(r, 1000));
        console.clear();
    }
}

// to show spcific entry detail ------------------------------------------------------------------------------------------
const entryDetails = async (idx) => {
    console.log("YOU ARE IN entryMenu");
    console.log(allEntries[idx]);
}

// To show all entries --------------------------------------------------------------------------------------------------
const showEntries = async () => {
    if (allEntries.length === 0) {
        console.log("No entries to show");
        return;
    } else {
        const choices = allEntries.map((e, i) => ({
            name: `Entry no:${i + 1}\nCreated at: ${e.createdAt}\nAmount: ${e.amount}\nNote: ${e.note}`,
            value: i,
        }));

        choices.push({name: "EXIT", value: -1});

        const res = await inquirer.prompt([{
            name: "entryChoice",
            message: "ALL ENTRIES",
            type: "list",
            choices: choices
        }]);

        if(res.entryChoice===-1)
            return;
        await entryDetails(res.entryChoice);
    }
}

// Main menu------------------------------------------------------------------------------------------------------------
const menu = async () => {

    let exit = false;
    while (!exit) {
        let res = await inquirer.prompt([{
            type: "list",
            message: "Choose one",
            name: "choice",
            choices: [
                "1. expense",
                "2. income",
                "3. view total",
                "4. Exit"
            ]
        }])

        if (res.choice === "1. expense") {
            await addExpense();
        } else if (res.choice === "2. income") {
            await addIncome();
        } else if (res.choice === "3. view total") {
            if (allEntries.length === 0)
                console.log("No entriess to show");
            else
                await showEntries();
        } else if (res.choice === "4. Exit") {
            exit = true;
        }
    }
}

menu();