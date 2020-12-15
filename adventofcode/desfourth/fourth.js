const fs = require('fs');

//Create array of numbers in a range from start to end
function range(start, end) {
    return [...Array(end - start).keys()].map(idx => start + idx);
};

//Split input data into array of ids
function parseIds(data) {
    let split = data.split(/[\n ,]/);
    let filterSplit = split.filter(x => x != "");
    return filterSplit;
};

//Convert ids from id array into js object
function parsePerson(id) {
    let propAndValue = [];
    const person = {};
    for (let i = 0; i < id.length; i++) {
        propAndValue.push(id[i].split(":"))
    }
    for (let j = 0; j < propAndValue.length; j++) {
        //object property: object value
        person[propAndValue[j][0]] = propAndValue[j][1]
    }
    return person;
};

//Check if valid passport against one star rules
function validateRuleOne(person) {
    return (
        person.hasOwnProperty("byr") &&
        person.hasOwnProperty("iyr") &&
        person.hasOwnProperty("eyr") &&
        person.hasOwnProperty("hgt") &&
        person.hasOwnProperty("hcl") &&
        person.hasOwnProperty("ecl") &&
        person.hasOwnProperty("pid"))
};

//Check if valid passport against two star rules
function validateRuleTwo(person) {
    return (
        /\d{4}/.test(person.byr) && 
        range(1920, 2002 + 1).includes(parseInt((person.byr))) &&

        /\d{4}/.test(person.iyr) && 
        range(2010, 2020 + 1).includes(parseInt(person.iyr)) &&

        /\d{4}/.test(person.eyr) && 
        range(2020, 2030 + 1).includes(parseInt(person.eyr)) &&

        /^\d{3}cm$|^\d{2}in$/.test(person.hgt) && 
        (range(150, 193 + 1).includes(parseInt(person.hgt)) || 
        range(59, 76 + 1).includes(parseInt(person.hgt))) &&

        /^#[0-9a-f]{6}$/.test(person.hcl) &&

        /amb|blu|brn|gry|grn|hzl|oth/.test(person.ecl) &&

        /^\d{9}$/.test(person.pid)
    );
};
function main() {
    var blankLines = /\n\n/;
    const getData = fs.readFileSync("fourthdata.txt", "utf-8");
    let idArr = getData.split(blankLines).map(ids => parseIds(ids));
    let personArr = idArr.map(id => parsePerson(id));
    
    //console.log(/[0-9]{4}/.test(personArr[0].byr) && range(1920, 2002).includes(parseInt((personArr[0].byr))));
    console.log(validateRuleTwo(personArr[2]))
    let validCounter = 0;
    let validTwoStar = 0;
    for (let i = 0; i < personArr.length; i++) {
        if (validateRuleOne(personArr[i])) {
            validCounter++;
        }
    };
    for (let i = 0; i < personArr.length; i++) {
        if (validateRuleTwo(personArr[i])) {
            validTwoStar++;
        }
    };
    return `Valid rule one: ${validCounter}, Valid rule two: ${validTwoStar}`;


}
validByrMin = /19[2-9][0-9]/
validByrMax = /200[0-2]/
validIyrMin = /201[0-9]/
validIyrMax = /2020/
validEyrMin = /202[0-9]/
validEyrMax = /2030/
validHeightCmMin = /1[5-8][0-9]/
validHeightCmMax = /19[0-3]/
validHeightInMin = /59/
validHeightInMid = /6[0-9]/
validHeightInMax = /7[0-6]/
validHcl = /^#[0-9a-f]{6}/
validEcl = /amb|blu|brn|gry|grn|hzl|oth/
validPid = /[0-9]{9}/
console.log(main());
