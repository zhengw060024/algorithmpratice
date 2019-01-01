"use strict";
// 芯片测试 算法导论思考题4-5
// 芯片测试证明:若真的少于n/2 个，在成对测试下使用任何策略都不能确定芯片是好的
// （存疑）若真的有m个，则从坏的中选取m个让其和真的测试结果完全相同，这样就无法判断
//  测试是有效的。
Object.defineProperty(exports, "__esModule", { value: true });
// 若真的多于n/2个，假设真的数目为A，坏的数目为B A+ B = n; B < A;
// 则有 对n个芯片每次取两个进行测试，选取两者都是好的情况进行分析：
// 假设测试结果二者都是好的出现的次数为t1，出现该情况时
// 要么都好，要么都坏，其他测试情况为t2(t2情况中至少有一个为坏的)，
// 假如 n为偶数有则有t1 + t2 = n /2 ，在t2 情况中好的数目为t2a，
// 坏零件数目为t2b ,t1测试中好零件数目为t1a，坏零件数目为t1b,，则t2a + t2b <= n /2;
// t1a >t1b; t1b + t2b < t2a+ t2b; => t2b < t2a && ta2 + t2b <= n/2;可以推断出对于
// n为偶数的情况下，规模缩小为原来的1/2；同样对于奇数的情况有 (n - 1) /2 + 1（奇数情况较复杂，需要分析边界情况,以及子节点的奇偶情况）
// 代码
var utilitytools_1 = require("./utilitytools");
var ChipTestCase = /** @class */ (function () {
    function ChipTestCase() {
    }
    ChipTestCase.prototype.runTest = function () {
        var arrayChip = generateChipArray(100);
        var arrayCheckResult = checkAllChip(arrayChip);
        var checkRs = checkResult(arrayChip, arrayCheckResult);
        printChipAarray(arrayChip);
        console.log("chipCheckRs is " + arrayCheckResult + ",test case result is " + checkRs);
    };
    return ChipTestCase;
}());
var chipTestCheck = new ChipTestCase();
exports.default = chipTestCheck;
function printChipAarray(chipArray) {
    var arrayOutput = [];
    chipArray.forEach(function (value) {
        arrayOutput.push(value.bGood);
    });
    console.log("array chip is " + arrayOutput);
}
function generateChipArray(totalChipNum) {
    var badChipNum = 0;
    var MaxChipNum = 0;
    if (totalChipNum % 2 === 0) {
        MaxChipNum = totalChipNum / 2 - 1;
    }
    else {
        MaxChipNum = (totalChipNum - 1) / 2;
    }
    badChipNum = utilitytools_1.default.generateRandom(1, MaxChipNum);
    console.log('bad chip number is ', badChipNum);
    var arrayChip = [];
    var arrayRandomHelp = [];
    for (var i = 0; i < totalChipNum; ++i) {
        arrayChip.push({ bGood: true });
        arrayRandomHelp.push(i);
    }
    for (var i = 0; i < badChipNum; ++i) {
        var k = utilitytools_1.default.generateRandom(i, arrayRandomHelp.length - 1);
        var temp = arrayRandomHelp[i];
        arrayRandomHelp[i] = arrayRandomHelp[k];
        arrayRandomHelp[k] = temp;
        ////////////////////////
        arrayChip[arrayRandomHelp[i]].bGood = false;
    }
    printChipAarray(arrayChip);
    return arrayChip;
}
var TestResult;
(function (TestResult) {
    TestResult[TestResult["ABAllBad"] = 0] = "ABAllBad";
    TestResult[TestResult["ABABadBGood"] = 1] = "ABABadBGood";
    TestResult[TestResult["ABAGoodBBad"] = 2] = "ABAGoodBBad";
    TestResult[TestResult["ABAllGood"] = 3] = "ABAllGood";
})(TestResult || (TestResult = {}));
function runTestChip(chipA, chipB) {
    // TestB
    var bBResult = 0;
    if (chipA.bGood) {
        if (chipB.bGood) {
            bBResult = 1;
        }
        else {
            bBResult = 0;
        }
    }
    else {
        bBResult = Math.round(Math.random());
    }
    var bAResult = 0;
    if (chipB.bGood) {
        if (chipA.bGood) {
            bAResult = 1;
        }
        else {
            bAResult = 0;
        }
    }
    else {
        bAResult = Math.round(Math.random());
    }
    return bAResult * 2 + bBResult;
}
function chipTest(ChipArray) {
    var nTestNum = ChipArray.length;
    var ArrayTestHelp = ChipArray.concat([]);
    // const ArrayTemp = [];
    while (nTestNum > 1) {
        var k = 0;
        if (nTestNum % 2 === 0) {
            for (var i = 0; i < nTestNum / 2; ++i) {
                var Temp = runTestChip(ArrayTestHelp[2 * i], ArrayTestHelp[2 * i + 1]);
                if (Temp === TestResult.ABAllGood) {
                    ArrayTestHelp[k] = ArrayTestHelp[2 * i];
                    ++k;
                }
            }
            nTestNum = k;
        }
        else {
            for (var i = 0; i < (nTestNum - 1) / 2; ++i) {
                var Temp = runTestChip(ArrayTestHelp[2 * i], ArrayTestHelp[2 * i + 1]);
                if (Temp === TestResult.ABAllGood) {
                    ArrayTestHelp[k] = ArrayTestHelp[2 * i];
                    ++k;
                }
            }
            if (k % 2 === 0) {
                ArrayTestHelp[k] = ArrayTestHelp[nTestNum - 1];
                nTestNum = k + 1;
            }
            else {
                nTestNum = k;
            }
        }
        // printChipAarray(ArrayTestHelp);
        // console.log(nTestNum);
        if (nTestNum === 0) {
            printChipAarray(ArrayTestHelp);
            throw new Error('error!!!!!!');
        }
    }
    return ArrayTestHelp[0];
}
function checkAllChip(ChipArray) {
    var trueChip = chipTest(ChipArray);
    console.log(trueChip);
    var arrayCheck = [];
    ChipArray.forEach(function (value) {
        var testResult = runTestChip(value, trueChip);
        if (testResult === TestResult.ABAGoodBBad || testResult === TestResult.ABAllGood) {
            arrayCheck.push(true);
        }
        else {
            arrayCheck.push(false);
        }
    });
    return arrayCheck;
}
function checkResult(ChipArray, arrayCheck) {
    if (ChipArray.length !== arrayCheck.length) {
        throw (new Error('Error Input!!!'));
    }
    for (var i = 0; i < ChipArray.length; ++i) {
        if (ChipArray[i].bGood !== arrayCheck[i]) {
            return false;
        }
    }
    return true;
}
// console.log(utilityTools.generateRandom(0, 2));
