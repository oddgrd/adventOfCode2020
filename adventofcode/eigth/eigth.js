"use strict";

const fs = require("fs");

class Instruction {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.count = 0;
        this.flipped = false;
    };
    flipSwitch() {
        this.key === "jmp" ? this.key = "nop" : this.key = "jmp";
    };
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
    for (let i = 0; i < instructions.length; i++) {
        if (instructions[i].count === 1) {
            return accumulator; 
        } else {   
            switch (instructions[i].key) {
                case "acc":
                    instructions[i].count++;
                    accumulator += instructions[i].value;
                    break;
                case "jmp":
                    instructions[i].count++;
                    i += instructions[i].value - 1;
                case "nop":
                    instructions[i].count++;
                    break;
            }
        }
    }
};

function main() {
    const data  = fs.readFileSync("eigthdata.txt", "utf-8");
    const split = data.split(/\n/);
    const instructions = split.filter(x => x !== "").map(x => parseInstruction(x));

    return `Part one: ${runGame(instructions)}`;
};

console.log(main());

