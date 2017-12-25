"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 雇佣问题ts代码
var utilitytools_1 = require("./utilitytools");
var COSTINT = 10;
var COSTHIRE = 100;
function generateInterViewArray() {
    var interviewNum = utilitytools_1.default.generateRandom(10, 40);
    var arrayTemp = utilitytools_1.default.generateRandomArray(1, 10, interviewNum);
    var arrayPerson = [];
    for (var i = 0; i < arrayTemp.length; ++i) {
        arrayPerson.push({
            id: i,
            skilllevel: arrayTemp[i]
        });
    }
    return arrayPerson;
}
function interview(person, totalCost) {
    totalCost.interviewcost += COSTINT;
    return person.skilllevel;
}
function hire(person, totalCost) {
    totalCost.hirecost += COSTHIRE;
}
function hireAssistant(arrayCandidate) {
    var totalCost = {
        interviewcost: 0,
        hirecost: 0
    };
    var arrayHiredId = [];
    var bestid = 0;
    arrayHiredId.push(0);
    for (var i = 1; i < arrayCandidate.length; ++i) {
        var skilllevel = interview(arrayCandidate[i], totalCost);
        if (skilllevel > arrayCandidate[bestid].skilllevel) {
            bestid = i;
            hire(arrayCandidate[i], totalCost);
            arrayHiredId.push(i);
        }
    }
    return {
        cost: totalCost,
        arrayHiredId: arrayHiredId
    };
}
/////////////////////////////////////
//使用random(0，1)生成random(a,b),算法导论习题5_1_2
//整理我的思路是这样的：生成0 - (b - a)个随机数，而对于当前的每次随机测试
// 我们只能生成0 到2^k - 1个随机数(在做k的随机01测试)，找出最小的k使2^k-1得等于b-a，
// 将这个过程作为一次roll点，对每个大于b-a的数字重新roll点直到找到范围内的数字
function getRandom01() {
    return Math.round(Math.random());
}
function getK2powernearMaxTo(num) {
    var i = 1;
    var MaxNum = 2;
    while (MaxNum - 1 < num) {
        MaxNum = MaxNum * 2;
        ++i;
    }
    return i;
}
function makeRandomByKpower(kpower) {
    var nResult = 0;
    var nPower = 1;
    for (var i = 0; i < kpower; ++i) {
        var Temp = getRandom01();
        nResult += nPower * Temp;
        nPower *= 2;
    }
    return nResult;
}
function generateRandomAB(a, b) {
    var nLength = b - a;
    var nK = getK2powernearMaxTo(b - a);
    var nRandom = 0;
    var nTotalCount = 0;
    do {
        nRandom = makeRandomByKpower(nK);
        console.log(nRandom);
        nTotalCount += nK;
    } while (nRandom > nLength);
    return {
        nRandomNum: (nRandom + a),
        nCount: nTotalCount
    };
}
var RandomGenTestCase = /** @class */ (function () {
    function RandomGenTestCase() {
    }
    RandomGenTestCase.prototype.testCaseInterview = function () {
        var arrayInterview = generateInterViewArray();
        console.log(arrayInterview);
        console.log(hireAssistant(arrayInterview));
    };
    RandomGenTestCase.prototype.testCaseRandomAB = function () {
        console.log(generateRandomAB(1, 10));
    };
    return RandomGenTestCase;
}());
var RandomTest = new RandomGenTestCase();
RandomTest.testCaseInterview();
RandomTest.testCaseRandomAB();
