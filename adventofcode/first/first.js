"use strict";

const fs = require("fs");

function partOne (nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === 2020) {
                return nums[i] * nums[j];
            }
        }
    }
};

function partTwo (nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] === 2020) {
                    return nums[i] * nums[j] * nums[k];
                }
            }
        }
    }
};

function main() {
    const data = fs.readFileSync("data.txt", "utf-8");
    const numbers = data
        .split(/\n/)
        .filter(x => x !== "")
        .map(x => parseInt(x));

    return `Part one: ${partOne(numbers)}, Part two: ${partTwo(numbers)}`;
};
console.log(main());
