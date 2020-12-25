"use strict";

const fs = require("fs");

class Instruction {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
};

function parseInstruction(str) {
    let split = str.split(" ");
    let key = split[0];
    let value = parseInt(split[1]);
    let instruction = new Instruction(key, value);
    return instruction;
};

function runGame(instructions) {
    let accumulator = 0;
    let visitedIdx = [];
    for (let i = 0; i < instructions.length; i++) {
        if (visitedIdx.includes(i)) {
            return accumulator; 
        } else {   
            switch (instructions[i].key) {
                case "acc":
                    visitedIdx.push(i);
                    accumulator += instructions[i].value;
                    break;
                case "jmp":
                    visitedIdx.push(i);
                    i += instructions[i].value - 1;
                case "nop":
                    visitedIdx.push(i);
                    break;
            }
        }
    }

};


function main() {
    const data  = fs.readFileSync("eigthdata.txt", "utf-8");
    const split = data.split(/\n/);
    const instructions = split.map(x => parseInstruction(x));
    
    return `Part one: ${runGame(instructions)}`;
};

console.log(main());

