"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilitytools_1 = require("./utilitytools");
// import re;
// 期望为线性事件的选择算法。原理，利用快排的划分算法。
/**
 * 从arrayInput的返回[startIndex,endIndex]子数组中
 * 有序(升序)之后，下标为kMax(相对于子数组)数字。
 * @param arrayInput 输入原始序列数组
 * @param startIndex 子数组起始Index
 * @param endIndex 子数组结束Index
 * @param kMax 子数组有序(升序)之后下标为kMax(相对于子数组)的数字
 */
function randomMized_select(arrayInput, startIndex, endIndex, kMin) {
    if (startIndex === endIndex) {
        return arrayInput[startIndex];
    }
    else {
        var nIndexDepart = randomDepart(arrayInput, startIndex, endIndex);
        var nIndexGet = nIndexDepart - startIndex;
        if (nIndexGet === kMin) {
            return arrayInput[nIndexDepart];
        }
        else {
            if (nIndexGet > kMin) {
                return randomMized_select(arrayInput, startIndex, nIndexDepart - 1, kMin);
            }
            else {
                return randomMized_select(arrayInput, nIndexDepart + 1, endIndex, kMin - nIndexGet - 1);
            }
        }
    }
}
/**
 * 分割arrayInput的范围在[startIndex,endIndex]的子数组，然后返回划分枢轴的下标
 * @param arrayInput 输入数组
 * @param startIndex 子数组起始下标
 * @param endIndex 子数组结束下标
 */
function randomDepart(arrayInput, startIndex, endIndex) {
    var nRandomIndex = utilitytools_1.default.generateRandom(startIndex, endIndex);
    // 交换 startIndex 和 nRandomIndex
    if (nRandomIndex !== startIndex) {
        var nTemp = arrayInput[startIndex];
        arrayInput[startIndex] = arrayInput[nRandomIndex];
        arrayInput[nRandomIndex] = nTemp;
    }
    var nDepartNum = arrayInput[startIndex];
    // i 表示枢轴位置。
    // 注意一下变量的作用域，不要将这部分代码写入循环中
    var j = startIndex + 1, i = startIndex;
    for (; j <= endIndex; ++j) {
        if (arrayInput[j] < nDepartNum) {
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = arrayInput[i + 1];
            ++i;
        }
    }
    arrayInput[i] = nDepartNum;
    return i;
}
function randomKMin(arrayInput, kIndex) {
    if (kIndex < 1 || kIndex > arrayInput.length) {
        throw new Error('Out of range!!!');
    }
    else {
        return randomMized_select(arrayInput, 0, arrayInput.length - 1, kIndex - 1);
    }
}
/**
 * 习题9-2.3randmom-select的一个基于循环的版本
 * @param arrayInput
 * @param kIndex
 */
function randomKMinNocur(arrayInput, kIndex) {
    if (kIndex < 1 || kIndex > arrayInput.length) {
        throw new Error('Out of range!!!');
    }
    else {
        var nStartIndex = 0;
        var nEndIndex = arrayInput.length - 1;
        var nPosReact = kIndex - 1;
        while (nStartIndex < nEndIndex) {
            var nDepart = randomDepart(arrayInput, nStartIndex, nEndIndex);
            var nDepartReact = nDepart - nStartIndex;
            if (nDepartReact === nPosReact) {
                return arrayInput[nDepart];
            }
            else if (nDepartReact > nPosReact) {
                nEndIndex = nDepart - 1;
            }
            else {
                nStartIndex = nDepart + 1;
                nPosReact = nPosReact - nDepartReact - 1;
            }
        }
        return arrayInput[nStartIndex];
    }
}
var RandomDepartGetKMinTest = (function () {
    function RandomDepartGetKMinTest() {
    }
    RandomDepartGetKMinTest.prototype.testCase = function () {
        var arrayInput = utilitytools_1.default.generateRandomArray(0, 1000, 40);
        var kIndexNum = utilitytools_1.default.generateRandom(1, arrayInput.length);
        console.log("kIndex is " + kIndexNum);
        console.log("Origin array is " + arrayInput);
        var nNumberRandom = randomKMin(arrayInput.concat(), kIndexNum);
        var nTrueNumber = this.getKMinNumBySort(arrayInput.concat(), kIndexNum);
        if (nNumberRandom === nTrueNumber) {
            console.log("Testcase RandomDepartGetKMinTest success!!! num is " + nNumberRandom);
        }
        else {
            console.log("Testcase RandomDepartGetKMinTest failed!!!,True number is " + nTrueNumber + ",but get " + nNumberRandom);
        }
    };
    RandomDepartGetKMinTest.prototype.testCaseNoCur = function () {
        var arrayInput = utilitytools_1.default.generateRandomArray(0, 1000, 40);
        var kIndexNum = utilitytools_1.default.generateRandom(1, arrayInput.length);
        console.log("kIndex is " + kIndexNum);
        console.log("Origin array is " + arrayInput);
        var nNumberRandom = randomKMinNocur(arrayInput.concat(), kIndexNum);
        var nTrueNumber = this.getKMinNumBySort(arrayInput.concat(), kIndexNum);
        if (nNumberRandom === nTrueNumber) {
            console.log("Testcase RandomDepartGetKMinTest success!!! num is " + nNumberRandom);
        }
        else {
            console.log("Testcase RandomDepartGetKMinTest failed!!!,True number is " + nTrueNumber + ",but get " + nNumberRandom);
        }
    };
    RandomDepartGetKMinTest.prototype.getKMinNumBySort = function (arrayInput, kIndex) {
        var arrayTemp = arrayInput.concat();
        arrayTemp.sort(function (a, b) {
            return a - b;
        });
        console.log("sorted array is " + arrayTemp);
        return arrayTemp[kIndex - 1];
    };
    return RandomDepartGetKMinTest;
}());
var testCaseKMinRandom = new RandomDepartGetKMinTest();
testCaseKMinRandom.testCase();
testCaseKMinRandom.testCaseNoCur();
var strTemp = "fdsafdsf{fdsafsd}fdsafdsaf";
var strTemp2 = "fdsafdsf{我是谁}";
var temp = RegExp('^(([^\{\}]*)(\{[a-zA-Z]+[_]*[a-zA-Z]+\})*)*$');
console.log(temp.test(strTemp));
console.log(temp.test(strTemp2));
// function randomDepart2(arrayInput: Array<number>,
//     startIndex: number, endIndex: number): number {
//     let nRandomIndex = utilityTools.generateRandom(startIndex, endIndex);
//     // 交换 startIndex 和 nRandomIndex
//     if (nRandomIndex !== startIndex) {
//         let nTemp = arrayInput[startIndex];
//         arrayInput[startIndex] = arrayInput[nRandomIndex];
//         arrayInput[nRandomIndex] = nTemp;
//     }
//     let nDepartNum = arrayInput[startIndex];
//     // i 表示枢轴位置。
//     let j = startIndex + 1,i = startIndex;
//     for (; j <= endIndex; ++j) {
//         if (arrayInput[j] < nDepartNum) {
//             arrayInput[i] = arrayInput[j];
//             arrayInput[j] = arrayInput[i + 1];
//             ++i;
//         }
//     }
//     arrayInput[i] = nDepartNum;
//     return i;
// }
// const arrayTemp = utilityTools.generateRandomArray(0,100,10);
// console.log(`${arrayTemp}`);
// let i = randomDepart2(arrayTemp,0,arrayTemp.length - 1);
// console.log(`${arrayTemp} i is  ${i}`); 
