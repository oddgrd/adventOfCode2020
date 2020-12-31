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
            //For part one I returned accumulator here, for part two
            //I changed it to return "Infinite"
            return "Infinite"; 
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
            var result = runGame(instructions);
            instructions[i].flipKey();
            if (result !== "Infinite") {
                return result;
            }
        }
    }
    return "All infinite";
};

function main() {
    const data  = fs.readFileSync("eigthdata.txt", "utf-8");
    const split = data.split(/\n/);
    const instructions = split.filter(x => x !== "").map(x => parseInstruction(x));

    return `Part one: ${runGame(instructions)} Part two: ${runGameTwo(instructions)}`;
};

console.log(main());
