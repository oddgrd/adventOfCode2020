"use strict";

console.time("test");

const fs = require("fs");

//Function to deep copy the 2d arrays
function deepCopy(nestedArr) {
  const copy = nestedArr.map(function (arr) {
    return arr.slice();
  });
  return copy;
}

function getNeighborCount(row, col, matrix) {
  const r = row;
  const c = col;
  let countOccupied = 0;
  //top
  if (r - 1 >= 0) {
    countOccupied += matrix[r - 1][c] === "#" ? 1 : 0;
  }
  //top left
  if (r - 1 >= 0 && c - 1 >= 0) {
    countOccupied += matrix[r - 1][c - 1] === "#" ? 1 : 0;
  }
  //top right
  if (r - 1 >= 0 && c + 1 < matrix[r].length) {
    countOccupied += matrix[r - 1][c + 1] === "#" ? 1 : 0;
  }
  //left
  if (c - 1 >= 0) {
    countOccupied += matrix[r][c - 1] === "#" ? 1 : 0;
  }
  //right
  if (c + 1 < matrix[r].length) {
    countOccupied += matrix[r][c + 1] === "#" ? 1 : 0;
  }
  //bottom left
  if (r + 1 < matrix.length && c - 1 >= 0) {
    countOccupied += matrix[r + 1][c - 1] === "#" ? 1 : 0;
  }
  //bottom right
  if (r + 1 < matrix.length && c + 1 < matrix[r].length) {
    countOccupied += matrix[r + 1][c + 1] === "#" ? 1 : 0;
  }
  //bottom
  if (r + 1 < matrix.length) {
    countOccupied += matrix[r + 1][c] === "#" ? 1 : 0;
  }
  return countOccupied;
}

function runGame(matrix) {
  let changes = 0;
  let next = deepCopy(matrix);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "L" && getNeighborCount(i, j, matrix) === 0) {
        changes++;
        next[i][j] = "#";
      }
      if (matrix[i][j] === "#" && getNeighborCount(i, j, matrix) >= 4) {
        changes++;
        next[i][j] = "L";
      }
    }
  }
  if (changes === 0) {
    return next;
  }
  return runGame(next);
}

function countOccurences(val, arr) {
  const concat = (a, b) => a.concat(b);
  return arr
    .reduce(concat, [])
    .reduce((acc, cur) => (acc += cur === val ? 1 : 0), 0);
}

//Optional countOccurences, execution time is almost identical
// function countOccurencesRegEx(val, arr) {
//   const re = new RegExp("#", "g");
//   const concat = (a, b) => a.concat(b);
//   return arr.reduce(concat, []).join("").match(re).length;
// }

function main() {
  const data = fs.readFileSync("eleventhdata.txt", "utf8");
  const rows = data
    .split(/\n/)
    .filter((x) => x !== "")
    .map((x) => x.split(""));

  const copy = deepCopy(rows);
  const result = runGame(copy);
  //console.log(countOccurencesRegEx("#", result));
  return `Seats occupied after changes stop: ${countOccurences("#", result)}`;
}

console.log(main());

//Execution time: ~66ms
console.timeEnd("test");
