"use strict";

const fs = require("fs");

const directions = ["north", "east", "south", "west"];

function turn(direction, facing, degrees) {
  const curIdx = directions.indexOf(facing);
  const turns = degrees === 270 ? 3 : degrees === 180 ? 2 : 1;
  const calculateIdx = () => {
    const temp = direction === "L" ? curIdx - turns : curIdx + turns;
    return temp > directions.length - 1 ? temp - directions.length : temp;
  };
  const newIdx = calculateIdx();
  const newFacing =
    newIdx >= 0 ? directions[newIdx] : directions[directions.length + newIdx];
  return newFacing;
}

function navigate(location, facing, instruction) {
  let loc = { ...location };
  let fac = facing;
  switch (instruction[0]) {
    case "N":
      loc.northSouth = loc.northSouth += instruction[1];
      break;
    case "E":
      loc.eastWest = loc.eastWest += instruction[1];
      break;
    case "S":
      loc.northSouth = loc.northSouth - instruction[1];
      break;
    case "W":
      loc.eastWest = loc.eastWest - instruction[1];
      break;
    case "L":
      fac = turn("L", facing, instruction[1]);
      break;
    case "R":
      fac = turn("R", facing, instruction[1]);
      break;
    case "F":
      facing === "north"
        ? (loc.northSouth = loc.northSouth += instruction[1])
        : facing === "east"
        ? (loc.eastWest = loc.eastWest += instruction[1])
        : facing === "south"
        ? (loc.northSouth = loc.northSouth - instruction[1])
        : facing === "west"
        ? (loc.eastWest = loc.eastWest - instruction[1])
        : null;
      break;
  }
  return [loc, fac];
}

function main() {
  const data = fs.readFileSync("twelfthdata.txt", "utf8");
  const instructions = data
    .split("\n")
    .filter((x) => x !== "")
    .map((x) => [x.slice(0, 1), parseInt(x.slice(1))]);

  const location = { eastWest: 0, northSouth: 0 };
  const facing = "east";
  let result = [location, facing];
  for (let i = 0; i < instructions.length; i++) {
    result = navigate(result[0], result[1], instructions[i]);
  }
  return `Manhattan distance: ${
    Math.abs(result[0].eastWest) + Math.abs(result[0].northSouth)
  }`;
}

console.log(main());
