#!/usr/bin/env node

import inquirer from 'inquirer';

let total = 0;

const addExpense = async () => {
    if (total <= 0) {
        console.error("not possible amount zero");
        await new Promise(r => setTimeout(r, 1000));
        console.clear();
        return;
    }
    const res = await inquirer.prompt([{
        type: "number",
        name: "amount",
        message: "Enter your expense : ",
    }]);
    if (res.amount <= 0) {
        console.error("Not valid amount");
        await new Promise(r => setTimeout(r, 2000));
        console.clear();
    } else {
        total -= res.amount;
        await new Promise(r => setTimeout(r, 2000));
        console.clear();
    }
}

const addIncome = async () => {
    const res = await inquirer.prompt([{
        type: "number",
        name: "amount",
        message: "Enter your income : ",
    }]);
    if (res.amount <= 0) {
        console.error("Not valid amount");
        await new Promise(r => setTimeout(r, 2000));
        console.clear();
    } else {
        total += res.amount;
        await new Promise(r => setTimeout(r, 2000));
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
            console.log(`Current amount : ${total}`);
        } else if (res.choice === "4. Exit") {
            exit = true;
        }
    }
}

menu();