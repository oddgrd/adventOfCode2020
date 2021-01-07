"use strict";

const fs = require("fs");

function sortArr(arr) {
    const sorted = arr.sort(function(a, b) {
        return a - b;
    });
    return sorted;
};

function findDifferences(adapters) {
    let differences = [];
    for (let i = 0; i < adapters.length - 1; i++) {
        differences.push(adapters[i + 1] - adapters[i]);
    };
    return differences;
};

function multiplyDifferences(differences) {
    const ones = differences.filter(x => x !== 3);
    const threes = differences.filter(x => x !== 1);
    return ones.length * threes.length;
};

function range(start, end) {
    let range = [];
    for (let i = start; i < end; i++) {
        range.push(i);
    };
    return range;
};

//Memoized depth first algorithm to find total number of distinct
//combinations of adapters from outlet to device. 
function findPaths(adjList, a, memo = {}) {
    if (memo.hasOwnProperty(a)){
        return memo[a];
    } else if (adjList.hasOwnProperty(a)){
        let sum = 0;
        for (let i = 0; i < adjList[a].length; i++){
            sum += findPaths(adjList, adjList[a][i], memo);
        }
        memo[a] = sum;
        return memo[a];
    } else {
        return 1;
    }
};

function main() {
    const data = fs.readFileSync("tenthdata.txt", "utf-8");
    const adapters = data
        .split(/\n/)
        .filter(x => x !== "")
        .map(x => parseInt(x));
    const device = Math.max(...adapters) + 3;
    
    //Sort adapters, add socket and device
    const sorted = sortArr([0, ...adapters, device]);

    //Create directed adjacency list (js obj with adapter as key and 
    //possible connections(edges) as values in an array)
    let adjList = {}
    for (let i = 0; i < sorted.length; i++){
        let r = range(sorted[i] + 1, sorted[i] + 4);
        let arr = [];
        for (let j = 0; j < r.length; j++){
            if (sorted.includes(r[j])) {
                arr.push(r[j]);
                adjList[sorted[i]] = arr;
            }
        }
    };

    return `1-jolt diff multiplied by 3-jolt diff: 
    ${multiplyDifferences(findDifferences(sorted))},
    Total number of distinct paths: ${findPaths(adjList, 0)}`;
};

console.log(main());

//log runtime (result: 5ms)
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
