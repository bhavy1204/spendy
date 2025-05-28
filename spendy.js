#!/usr/bin/env node

import inquirer from 'inquirer';

let total = 0;

let entry = [];

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
    if ( amountRes.amount <= 0) {
        console.error("Not valid amount");
        await new Promise(r => setTimeout(r, 2000));
        console.clear();
    } else {
        let createdAt = new Date().toLocaleString();
        let noteRes = await inquirer.prompt([{
            message:"Add note : ",
            name:"note",
            type:"input"
        }])
        total -=  amountRes.amount;
        entry.push({amount:amountRes.amount, note: noteRes.note,createdAt:createdAt}); 
        console.log("Entry added successfully");
        await new Promise(r => setTimeout(r, 1000));
        console.clear();
    }
}

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
            message:"Add note : ",
            name:"note",
            type:"input"
        }])
        total += amountRes.amount;
        entry.push({amount:amountRes.amount, note: noteRes.note,createdAt:createdAt}); 
        console.log("Entry added successfully");
        await new Promise(r => setTimeout(r, 1000));
        console.clear();
    }
}

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
            entry.forEach(e => {
                console.log(`${e.createdAt}\nAmount: ${e.amount}\nNotes: ${e.note}\n-----------------------------`);
            });
        } else if (res.choice === "4. Exit") {
            exit = true;
        }
    }
}

menu();