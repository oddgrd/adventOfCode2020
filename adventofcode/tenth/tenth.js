"use strict";

const fs = require("fs");

function sortArr(arr) {
    const sorted = arr.sort(function(a, b) {
        return a - b;
    });
    return sorted;
};

function findDifferences(adapters) {
    let differences = [];
    let i = 1;
    for (let j = 0; j < adapters.length - 1; j++) {
        differences.push(adapters[j + i] - adapters[j]);
    };
    return differences;
};

function multiplyDifferences(differences) {
    let threes = differences.filter(x => x !== 1);
    let ones = differences.filter(x => x !== 3);
    return ones.length * threes.length;
};

function main() {
    const data = fs.readFileSync("tenthdata.txt", "utf-8");
    const adapters = data
        .split(/\n/)
        .filter(x => x !== "")
        .map(x => parseInt(x));
    const device = Math.max(...adapters) + 3;
    adapters.unshift(0); //outlet
    adapters.push(device);

    return `1-jolt diff multiplied by 3-jolt diff: 
    ${multiplyDifferences(findDifferences(sortArr(adapters)))}`;
};

console.log(main());
