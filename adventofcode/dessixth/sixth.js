const fs = require("fs");

function parseGroups(data) {
    return data.split(/\n/);
};

//Returns a str of unique chars from input group
function parseUniqueAnswers(arr) {
    let str = arr.join("");
    return String.prototype.concat(...new Set(str));
};

//Returns object with answer as key and occurrences as value, and group size
function parseAnswerCount(arr) {
    const groupSize = arr.length;
    const charArray = arr.join("").split("");

    const occurrences = charArray.reduce((acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1
    }), {});
    return [occurrences, groupSize];
};

//Returns the count of unanimous answers from a group
function countUnanimous(arr) {
    let groupSize = arr[1];
    let obj = arr[0];
    let count = 0;
    for (let k in obj) {
        if (obj[k] === groupSize) {
            count++
        }
    }
    return count;
};

function countChars(str) {
    let charArray = [...str];
    return charArray.reduce((count, char) => count + char.length, 0);
};

function main() {
    const data = fs.readFileSync("sixthdata.txt", "utf-8");
    const splitBlankLines = data.split(/\n\n/).filter(x => x !== "");
    const groups = splitBlankLines.map(el => parseGroups(el));

    let oneStarCount = 0;
    for (let i = 0; i < groups.length; i++) {
        oneStarCount += countChars(parseUniqueAnswers(groups[i]));
    };

    let twoStarCount = 0;
    for (let i = 0; i < groups.length; i++) {
        twoStarCount += countUnanimous(parseAnswerCount(groups[i]))
    };

    return `One star count: ${oneStarCount}, Two star count: ${twoStarCount}`;
};

console.log(main());
