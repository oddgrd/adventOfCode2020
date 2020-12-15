const fs = require('fs');

const reNewline = /\n/;

class PasswordEntry {
    constructor(idxs, char, password) {
        this.idxs = idxs
        this.char = char
        this.password = password
    }

    isValidPassword() {
        let charCount = this.password.split("").filter(c => c === this.char);
        return charCount.length >= this.idxs[0] && charCount.length <= this.idxs[1];
    }
    isValidSledRental() {
        return (this.password[this.idxs[0] - 1] === this.char) ^ (this.password[this.idxs[1] - 1] === this.char);
    }
}

function parseRuleRange(str) {
    let nums = str.split("-");
    return nums.map(num => parseInt(num));
};

function parseRuleChar(str) {
    return str[0];
};

function parsePasswordEntry(str) {
    let strSplit = str.split(" ");
    let idxs = parseRuleRange(strSplit[0]);
    let char = parseRuleChar(strSplit[1])
    let password = strSplit[2];

    let passwordEntries = new PasswordEntry(idxs, char, password);
    return passwordEntries;
};

function main() {
    let getData = fs.readFileSync("twostardata.txt", "utf-8");
    let dataSplit = getData.toString().split(reNewline).filter(element => element != "");
    let passwordEntries = dataSplit.map(element => parsePasswordEntry(element));

    let validOneStar = 0;
    let validSledRental = 0;

    for (let i = 0; i < dataSplit.length; i++) {
        if (passwordEntries[i].isValidPassword()) {
            validOneStar++;
        }
        if (passwordEntries[i].isValidSledRental()) {
            validSledRental++;
        }
    };
    return `validOneStar: ${validOneStar}, validSledRental ${validSledRental}`;
};
console.log(main());
