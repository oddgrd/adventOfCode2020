const fs = require("fs");

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
    const groupSize = arr[1];
    const obj = arr[0];
    let count = 0;
    for (let k in obj) {
        if (obj[k] === groupSize) {
            count++
        }
    }
    return count;
};

function countChars(str) {
    const charArray = [...str];
    return charArray.reduce((count, char) => count + char.length, 0);
};

function main() {
    const data = fs.readFileSync("sixthdata.txt", "utf-8");
    const groups = data
        .split(/\n\n/)
        .filter(x => x !== "")
        .map(x => x.split(/\n/));

    let partOneCount = 0;
    for (let i = 0; i < groups.length; i++) {
        partOneCount += countChars(parseUniqueAnswers(groups[i]));
    };

    let partTwoCount = 0;
    for (let i = 0; i < groups.length; i++) {
        partTwoCount += countUnanimous(parseAnswerCount(groups[i]))
    };

    return `Part one: ${partOneCount}, Part two: ${partTwoCount}`;
};

console.log(main());
