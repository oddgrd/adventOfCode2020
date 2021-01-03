"use strict";

const fs = require("fs");

function searchPreamble(preamble, target) {
    for (let i = 0; i < preamble.length - 1; i++) {
        for (let j = i + 1; j < preamble.length; j++) {
            if (preamble[i] + preamble[j] === target) {
                return false;
            };
        };
    };
    return true;
};

function findInvalid(numbers) {
    let j = 0;
    for (let i = 25; i < numbers.length; i++) {
        let preamble = numbers.slice(j, 25 + j);
        j++;
        if (searchPreamble(preamble, numbers[i])) {
            return numbers[i];
        };
    };
};

function findContiguous(numbers, target) {
    let contiguous = [];
    for (let i = 25; i < numbers.length; i++) {
        contiguous.push(numbers[i]);
        let sum = numbers[i];
        let j = 1;

        while (sum < target) {
            contiguous.push(numbers[i + j]);
            sum += numbers[i + j];
            j++;
        };
        if (sum === target) {
            return Math.min(...contiguous) + Math.max(...contiguous);
        } else {
            contiguous = [];
        };
    };
};

function main(){
    const data = fs.readFileSync("ninthdata.txt", "utf-8");
    const split = data.split(/\n/);
    const numbers = split.filter(x => x !== "").map(x => parseInt(x));
    
    let invalid = findInvalid(numbers);
    let contiguous = findContiguous(numbers, invalid);
    return `First invalid: ${invalid}, encryption weakness: ${contiguous}`;
};

console.log(main());
