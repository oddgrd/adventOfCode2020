const fs = require('fs');

const tobogganPath = [
    {
        right: 1,
        down: 1
    },
    {
        right: 3,
        down: 1
    },
    {
        right: 5,
        down: 1
    },
    {
        right: 7,
        down: 1
    },
    {
        right: 1,
        down: 2
    }
];

class TreeLine{
    constructor(str) {
        this.line = str
    }
    isTree(idx) {
        return this.line[idx] === "#";
    }
}

function parseTreeLine(str) {
    return new TreeLine(str);
};

function scanTreeLine(arr, right, down) {
    let idx = right;
    let d = down;
    let tree = 0;
    for (let i = d; i < arr.length; i = i + down) {
        if (arr[i].isTree(idx)) {
            tree++;
        }
        idx = idx + right;
    }
    return tree;
}

function extendTreeLines(arr, rule) {
    let repeatFactor = 1;
    let dataExtended = [];
    const extendValue = Math.floor(31 / rule - 1);
    for (let i = 0; i < arr.length; i++) {
        dataExtended.push(parseTreeLine(arr[i].repeat(repeatFactor)));
        if (i % extendValue === 0 && i != 0) {
            repeatFactor++
        }
    }
    return dataExtended;
}

function main() {
    const reNewline = /\n/;
    let getData = fs.readFileSync("thirddata.txt", "utf-8");
    let dataArr = getData.split(reNewline);
    
    let calculatedPaths = [];
    for (let i = 0; i < tobogganPath.length; i++) {
        calculatedPaths.push(scanTreeLine(extendTreeLines(dataArr, tobogganPath[i].right), tobogganPath[i].right, tobogganPath[i].down))
    }
    return calculatedPaths.reduce((acc, val) => acc * val);
}
console.log(main());

