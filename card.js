#!/usr/bin/env node

'use strict'

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const DownloaderHelper = require('node-downloader-helper');
const cliSpinners = require('cli-spinners');
clear();

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            {
                name: `Send me an ${chalk.green.bold("email")}?`,
                value: () => {
                    open("mailto:colehausman@gmail.com");
                    console.log("\nDone, see you soon at inbox.\n");
                }
            },
            {
                name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
                value: () => {
                    // cliSpinners.dots;
                    const loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();
                    let pipe = request('https://raw.githubusercontent.com/ColeH02/about-me/main/ColeHausmanResume.pdf').pipe(fs.createWriteStream('./cole_hausman-resume.pdf'));
                    pipe.on("finish", function () {
                        let downloadPath = path.join(process.cwd(), 'cole_hausman-resume.pdf')
                        console.log(`\nResume Downloaded at ${downloadPath} \n`);
                        open(downloadPath)
                        loader.stop();
                    });
                }
            },
            {
                name: "Just quit.",
                value: () => {
                    console.log("See ya!.\n");
                }
            }
        ]
    }
];

const data = {
    name: chalk.hex('#ffffff').bold("                     Cole Hausman"),
    fact: chalk.hex('#fafa6e')('If at first you dont succeed try try try try try again'),
    email: chalk.hex('#c4ec74')("colehausman@gmail.com"),
    github: chalk.hex('#92dc7e')("https://github.com/ColeH02"),
    website: chalk.hex('#64c987')("https://www.linkedin.com/in/cole-hausman"),
    npx: chalk.hex('#39b48e')("npx cole_hausman"),

    labelFact: chalk.hex('#e407d2').bold("          Fun Fact:"),
    labelEmail: chalk.hex('#be0fc4').bold("          Email:"),
    labelGitHub: chalk.hex('#9912b5').bold("         GitHub:"),
    labelWebsite: chalk.hex('#7513a4').bold("       LinkedIn:"),
    labelCard: chalk.hex('#511191').bold("                  Card:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelFact}  ${data.fact}`,
        ``,
        `${data.labelEmail}  ${data.email}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelWebsite}  ${data.website}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.bold(
            "Hi there! I'm Cole, a passionate developer "
        )}`,
        `${chalk.bold("who is always looking to connect! I'm a")}`,
        `${chalk.bold("Student at Bucknell University and currently")}`
    ].join("\n") + "\n" +
    chalk.bold("working as a ") +
    chalk.hex('#e407d2').bold("ServiceNow") +
    chalk.bold(" Software Engineering Intern."),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "blue"
    }
);

// Show the boxen
console.log(me);

prompt(questions).then(answer => answer.action());
