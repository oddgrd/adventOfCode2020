"use strict";

const fs = require("fs");

function parsePreamble(numbers, idx) {
    const preamble = numbers.slice(idx, 25 + idx);
    return preamble;
};

function sumBool(nr1, nr2, target) {
    return nr1 + nr2 === target;
};

function findWeakness(preamble, target) {
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

function main(){
    const data = fs.readFileSync("ninthdata.txt", "utf-8");
    const split = data.split(/\n/);
    const numbers = split.filter(x => x !== "").map(x => parseInt(x));
    
    let weakness;
    let y = 0;
    for (let i = 25; i < numbers.length; i++) {
        let preamble = parsePreamble(numbers, y);
        y++;
        let result = findWeakness(preamble, numbers[i]);
        
        if (result) {
            weakness = result;
            break;
        };
    };

    return `First weakness in the cipher: ${weakness}`;
};

console.log(main());

