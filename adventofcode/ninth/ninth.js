"use strict";

const fs = require("fs");

function parsePreamble(numbers, idx) {
    const preamble = numbers.slice(idx, 25 + idx);
    return preamble;
};

function sumBool(nr1, nr2, target) {
    return nr1 + nr2 === target;
};

function searchPreamble(preamble, target) {
    const preambleReversed = [...preamble].reverse();
    for (let i = 0; i < preamble.length; i++) {
        for (let y = 0; y < preambleReversed.length; y++) {
            if (sumBool(preamble[i], preambleReversed[y], target)) {
                return false;
            }
        }
    }
    return target;
};

function findInvalid(numbers) {
    let y = 0;
    for (let i = 25; i < numbers.length; i++) {
        let preamble = parsePreamble(numbers, y);
        y++;
        let result = searchPreamble(preamble, numbers[i]);
        
        if (result) {
            return result;
        };
    };
    return "No invalid";
};

function findContiguos(numbers, target) {
    let contiguos = [];
};

function main(){
    const data = fs.readFileSync("ninthdata.txt", "utf-8");
    const split = data.split(/\n/);
    const numbers = split.filter(x => x !== "").map(x => parseInt(x));
    
    return `First invalid number: ${findInvalid(numbers)}`;
};

console.log(main());

