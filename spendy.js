#!/usr/bin/env node

import inquirer from 'inquirer';
import { validate } from 'uuid';
import { state } from './store/data.js'
import { menu } from './menu.js';



// Function to add expenses ---------------------------------------------------------------------------------




// to show spcific entry detail ------------------------------------------------------------------------------------------
const entryDetails = async (idx) => {
    console.log(allEntries[idx]);
}

// To show all entries --------------------------------------------------------------------------------------------------
const showAllEntries = async () => {

    if (allEntries.length === 0) {
        console.log("No entries to show");
        await new Promise((r) => setTimeout(r, 1000));
        console.clear();
        return;
    } else {

        const filterRes = await inquirer.prompt([{
            type: "confirm",
            name: "wantsFilter",
            message: "Do you want to apply a filter?",
            default: false
        }]);
        if (filterRes.wantsFilter) {
            const filterType = await inquirer.prompt([{
                type: "list",
                name: "filterName",
                message: "Choose filter from below ",
                choices: [
                    "Most expensive first "
                ]
            }])
        } else {
            const choices = allEntries.map((e, i) => ({
                name: `${i + 1}\tCreated at: ${e.createdAt}\t\t | Amount: ${e.amount}\t\tNote: ${e.note}`,
                value: i,
            }));

            choices.push({ name: "EXIT", value: -1 });

            const res = await inquirer.prompt([{
                name: "entryChoice",
                message: "ALL ENTRIES",
                type: "list",
                choices: choices
            }]);

            if (res.entryChoice === -1)
                return;
            await entryDetails(res.entryChoice);

        }
    }
}

// To show all expenses entries-----------------------------------------------------------------------------------------
const showAllExpenseEntries = async () => {

    if (allEntries.length === 0) {
        console.log("No entries to show");
        await new Promise((r) => setTimeout(r, 1000));
        console.clear();
        return;
    } else {

        const filterRes = await inquirer.prompt([{
            type: "confirm",
            name: "wantsFilter",
            message: "Do you want to apply a filter?",
            default: false
        }]);
        if (filterRes.wantsFilter) {
            const filterType = await inquirer.prompt([{
                type: "list",
                name: "filterName",
                message: "Choose filter from below ",
                choices: [
                    "Most expensive first "
                ]
            }])
        } else {
            const choices = allEntries.map((e, i) => ({
                name: `${i + 1}\tCreated at: ${e.createdAt}\t\t | Amount: ${e.amount}\t | Note: ${e.note}`,
                value: i,
            }));

            choices.push({ name: "EXIT", value: -1 });

            const res = await inquirer.prompt([{
                name: "entryChoice",
                message: "ALL ENTRIES",
                type: "list",
                choices: choices
            }]);

            if (res.entryChoice === -1)
                return;
            await entryDetails(res.entryChoice);

        }
    }
}

// To show all income entries--------------------------------------------------------------------------------------------

const showAllIncomeEntries = async () => {

    if (allEntries.length === 0) {
        console.log("No entries to show");
        return;
    } else {

        const filterRes = await inquirer.prompt([{
            type: "confirm",
            name: "wantsFilter",
            message: "Do you want to apply a filter?",
            default: false
        }]);
        if (filterRes.wantsFilter) {
            const filterType = await inquirer.prompt([{
                type: "list",
                name: "filterName",
                message: "Choose filter from below ",
                choices: [
                    "Most expensive first "
                ]
            }])
        } else {
            const choices = allEntries.map((e, i) => ({
                name: `${i + 1}\t | Created at: ${e.createdAt}\t | Amount: ${e.amount}\t | Note: ${e.note}`,
                value: i,
            }));

            choices.push({ name: "EXIT", value: -1 });

            const res = await inquirer.prompt([{
                name: "entryChoice",
                message: "ALL ENTRIES",
                type: "list",
                choices: choices
            }]);

            if (res.entryChoice === -1)
                return;
            await entryDetails(res.entryChoice);

        }
    }
}


// Main menu------------------------------------------------------------------------------------------------------------


menu();