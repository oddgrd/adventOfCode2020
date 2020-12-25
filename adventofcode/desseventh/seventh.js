"use strict";

const fs = require("fs");

class Bag {
    constructor(name, content) {
        this.name = name
        this.content = content
    };

    containsGold() {
        return this.content.includes("shiny gold");
    };
    getContent() {
        return this.content;
    };
};

function parseBagName(str) {
    const split = str.split(" ");
    //Filter out first two words and join them to get name of bag
    const name = split.filter((x, idx) => idx < 2).join(" ");
    return name;
};

function parseBagContent(str) {
    //slice away string up to and including "contain"
    const slice = str.slice(str.indexOf("contain") + 8);
    const split = slice.split(" ");
    //if first word in sliced string is no, bag contains nothing
    if (split[0] === "no") {
        return [];
    };
    const content = slice.replace(/bags|bag|\.|\d/gi, "").split(",").map(x => x.trim());
    return content;
};

function parseBag(str) {
    return new Bag(parseBagName(str), parseBagContent(str));
};

function goDeeper(bagContent, arr) {
    if (bagContent.length === 0) {
        return false;
    }
    if (bagContent.includes("shiny gold")) {
        return true;
    }

    let bagsToVisit = [];
    for (let j = 0; j < bagContent.length; j++) {
        var bag = arr.find(function(x) {
            return x.name === bagContent[j];
        });
        if (bag) {
            bagsToVisit.push(bag.getContent());
        }  
    };
    return goDeeper(bagsToVisit.flat(), arr);
};

function main() {
    const data = fs.readFileSync("seventhdata.txt", "utf-8").split(/\n/);
    const bagArray = data.filter(x => x!== "").map(x => parseBag(x));
    
    var goldCounter = 0;
    for (let i = 0; i < bagArray.length; i++) {
        if (bagArray[i].containsGold()) {
            goldCounter += 1;
        } else {
            var bagsToVisit = bagArray[i].getContent();
            if (goDeeper(bagsToVisit, bagArray)) {
                goldCounter += 1;
            }
        }
    };

    return goldCounter;
};

var start = new Date()
var hrstart = process.hrtime()
var simulateTime = 5

setTimeout(function () {
  // execution time simulated with setTimeout function
  var end = new Date() - start,
    hrend = process.hrtime(hrstart)

  console.info('Execution time: %dms', end)
  console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
}, simulateTime)

console.log(main());
