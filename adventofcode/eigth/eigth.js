"use strict";

const fs = require("fs");

class Instruction {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    };
    flipKey() {
        this.key === "jmp" ? this.key = "nop" : this.key = "jmp";
    };
};

function parseInstruction(str) {
    const split = str.split(" ");
    const key = split[0];
    const value = parseInt(split[1]);
    const instruction = new Instruction(key, value);
    return instruction;
};

function runGame(instructions, partTwo = false) {
    let accumulator = 0;
    let visitedIdx = [];
    for (let i = 0; i < instructions.length; i++) {
        if (visitedIdx.includes(i)) {
            return (partTwo ? "Infinite" : accumulator);
        } else {
            switch (instructions[i].key) {
                case "acc":
                    visitedIdx.push(i);
                    accumulator += instructions[i].value;
                    break;
                case "jmp":
                    visitedIdx.push(i);
                    i += instructions[i].value - 1;
                    break;
                case "nop":
                    visitedIdx.push(i);
                    break;
            }
        }
    }
    return accumulator;
};

function runGameTwo(instructions) {
    for (let i = 0; i < instructions.length; i++) {
        if (instructions[i].key === "jmp" || instructions[i].key === "nop") {
            instructions[i].flipKey();
            let result = runGame(instructions, true);
            instructions[i].flipKey();
            if (result !== "Infinite") {
                return result;
            }
        }
    };
};

function main() {
    const data  = fs.readFileSync("eigthdata.txt", "utf-8");
    const instructions = data
        .split(/\n/)
        .filter(x => x !== "")
        .map(x => parseInstruction(x));
    return `Part one: ${runGame(instructions)} Part two: ${runGameTwo(instructions)}`;
};

console.log(main());
