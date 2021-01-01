const fs = require("fs");

function range(start, end) {
    return [...Array(end - start).keys()].map(idx => start + idx);
};

function findRow(chars) {
    let rows = range(0, 127 + 1);
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === "F") {
            rows.splice(Math.floor(rows.length / 2))
        }
        if (chars[i] === "B") {
            rows.splice(0, Math.floor(rows.length / 2))
        }
    }
    return rows.reduce((acc, cur) => acc + parseInt(cur));
};

function findColumn(chars) {
    let columns = range(0, 7 + 1);
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === "L") {
            columns.splice(Math.floor(columns.length / 2))
        }
        if (chars[i] === "R") {
            columns.splice(0, Math.floor(columns.length / 2))
        }
    }
    return columns.reduce((acc, cur) => acc + parseInt(cur));
};

function findSeatId(row, column) {
    return row * 8 + column;
};

function myId(arr) {
    let sorted = arr.sort(function(a, b) {
        return a - b;
    });
    let id = 0;
    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i + 1] > sorted[i] + 1) {
            id = sorted[i + 1] - 1;
        }
    }
    return id;
};

function main() {
    const data = fs.readFileSync("fifthdata.txt", "utf-8");
    const dataSplit = data.split(/\n/).filter(x => x != "");
    
    const seatIdArray = dataSplit.map(function(line) {
        return findSeatId(findRow(line), findColumn(line.slice(line.length - 4)));
    });

    return `One star: ${Math.max(...seatIdArray)}, Two star: ${myId(seatIdArray)}`;
};

console.log(main());
var start = new Date()
var hrstart = process.hrtime()
var simulateTime = 5

setTimeout(function (argument) {
  // execution time simulated with setTimeout function
  var end = new Date() - start,
    hrend = process.hrtime(hrstart)

  console.info('Execution time: %dms', end)
  console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
}, simulateTime)


