"use strict";

const fs = require('fs');

class PasswordEntry {
    constructor(idxs, char, password) {
        this.idxs = idxs
        this.char = char
        this.password = password
    };

    isValidPassword() {
        const charCount = this.password.split("").filter(c => c === this.char);
        return charCount.length >= this.idxs[0] && charCount.length <= this.idxs[1];
    };
    isValidSledRental() {
        return (this.password[this.idxs[0] - 1] === this.char) ^ (this.password[this.idxs[1] - 1] === this.char);
    };
};

function parseRuleRange(str) {
    const nums = str.split("-");
    return nums.map(num => parseInt(num));
};

function parseRuleChar(str) {
    return str[0];
};

function parsePasswordEntry(str) {
    const strSplit = str.split(" ");
    const idxs = parseRuleRange(strSplit[0]);
    const char = parseRuleChar(strSplit[1])
    const password = strSplit[2];
    const passwordEntry = new PasswordEntry(idxs, char, password);
    return passwordEntry;
};

function main() {
    const data = fs.readFileSync("twostardata.txt", "utf-8");
    const passwordEntries = data
        .split(/\n/)
        .filter(x => x !== "")
        .map(x => parsePasswordEntry(x));
    let partOne = 0;
    let partTwo = 0;
    for (let i = 0; i < passwordEntries.length; i++) {
        if (passwordEntries[i].isValidPassword()) {
            partOne++;
        }
        if (passwordEntries[i].isValidSledRental()) {
            partTwo++;
        }
    };
    return `Part one: ${partOne}, Part two ${partTwo}`;
};

console.log(main());
