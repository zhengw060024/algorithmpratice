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
        // console.log(nRandom);
        nTotalCount += nK;
    } while (nRandom > nLength);
    return {
        nRandomNum: (nRandom + a),
        nCount: nTotalCount
    };
}
////////////////////
//算法导论习题5-1-3
//无偏差输出0,1
////////////////////
/**
 * 0.75的概率产生0,0.25的概率产生1
 */
function generate01NoEqual() {
    var k = utilitytools_1.default.generateRandom(1, 20);
    if (k <= 15) {
        return 0;
    }
    return 1;
}
// 思路每两组组合成为一次roll点测试，当出现01，和10时分别返回0,1,其他情况重复roll点测试即可
function generateToNoEqualWrap() {
    var t1 = generate01NoEqual();
    var t2 = generate01NoEqual();
    return 2 * t1 + t2;
}
function generate01Equal() {
    var nCount = 0;
    while (true) {
        var k = generateToNoEqualWrap();
        ++nCount;
        if (k === 1) {
            return {
                nRandomResult: 0,
                nCount: nCount
            };
        }
        else if (k === 2) {
            return {
                nRandomResult: 1,
                nCount: nCount
            };
        }
    }
}
function testGenerateEqual() {
    var objTemp = {
        nCount0: 0,
        nGenGount0: 0,
        nCount1: 0,
        nGenGount1: 0
    };
    for (var i = 0; i < 10000; ++i) {
        var temp = generate01Equal();
        if (temp.nRandomResult === 0) {
            objTemp.nGenGount0 += temp.nCount;
            ++objTemp.nCount0;
        }
        else {
            objTemp.nGenGount1 += temp.nCount;
            ++objTemp.nCount1;
        }
    }
    console.log(objTemp);
}
function testCaseNoEqual() {
    var k = 0;
    var t = 0;
    for (var i = 0; i < 10000; ++i) {
        if (generate01NoEqual() === 1) {
            ++t;
        }
        else {
            ++k;
        }
    }
    console.log("0 num is " + k + ",1 num is " + t);
}
function testCaseGenerate() {
    var obj = {};
    for (var i = 0; i < 10000; ++i) {
        var k = utilitytools_1.default.generateRandom(1, 20);
        if (!obj[k]) {
            obj[k] = 1;
        }
        else {
            ++obj[k];
        }
    }
    console.log(obj);
}
function testCaseGenerateOldErr() {
    var obj = {};
    for (var i = 0; i < 10000; ++i) {
        var k = utilitytools_1.default.generateRandomOldErr(1, 20);
        if (!obj[k]) {
            obj[k] = 1;
        }
        else {
            ++obj[k];
        }
    }
    console.log(obj);
}
var RandomGenTestCase = /** @class */ (function () {
    function RandomGenTestCase() {
    }
    RandomGenTestCase.prototype.runTest = function () {
        this.testCaseInterview();
        this.testCaseRandomAB();
        this.testEqual01();
    };
    RandomGenTestCase.prototype.testCaseInterview = function () {
        var arrayInterview = generateInterViewArray();
        console.log(arrayInterview);
        console.log(hireAssistant(arrayInterview));
    };
    // 最好做个随机千次测试，然后对每种情况计数
    RandomGenTestCase.prototype.testCaseRandomAB = function () {
        var nRandomCount = 10 /*utilityTools.generateRandom(2,11)*/;
        var nRandomStart = utilitytools_1.default.generateRandom(0, 11);
        var nRandomEnd = nRandomStart + nRandomCount - 1;
        var objTemp = {};
        for (var i = 0; i < nRandomCount * 500; ++i) {
            var Temp = generateRandomAB(nRandomStart, nRandomEnd);
            if (objTemp[Temp.nRandomNum]) {
                (objTemp[Temp.nRandomNum])['count']++;
                (objTemp[Temp.nRandomNum])['totalcount'] += Temp.nCount;
            }
            else {
                objTemp[Temp.nRandomNum] = { count: 0, totalcount: 0 };
            }
        }
        console.log(objTemp);
    };
    RandomGenTestCase.prototype.testEqual01 = function () {
        testGenerateEqual();
    };
    return RandomGenTestCase;
}());
testGenerateEqual();
// testCaseGenerate();
// testCaseNoEqual();
// const RandomTest = new RandomGenTestCase();
// RandomTest.testCaseInterview();
// RandomTest.testCaseRandomAB();
