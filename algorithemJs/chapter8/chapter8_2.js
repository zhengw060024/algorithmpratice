"use strict";
exports.__esModule = true;
var utilitytools_1 = require("./utilitytools");
/**
 * 桶排序
 * @param arrayInput 输入
 * @param nRangeMin 桶排序下限
 * @param nRangMax 桶排序上限,注意不包含nRangeMax
 */
function bucketSort(arrayInput, nRangeMin, nRangMax) {
    var nRange = nRangMax - nRangeMin;
    var nNum = arrayInput.length;
    var arrayHelp = [];
    // let nRangeDeaprt = nRange / nNum;
    for (var i = 0; i < arrayInput.length; ++i) {
        var nIndex = Math.floor((arrayInput[i] - nRangeMin) * nNum / nRange);
        if (!arrayHelp[nIndex]) {
            arrayHelp[nIndex] = [];
        }
        arrayHelp[nIndex].push(arrayInput[i]);
    }
    for (var i = 0; i < arrayHelp.length; ++i) {
        if (arrayHelp[i]) {
            arrayHelp[i].sort(function (a, b) {
                return a - b;
            });
        }
        else {
        }
    }
    var arrayTemp = [];
    // console.log(arrayHelp);
    for (var i = 0; i < arrayHelp.length; ++i) {
        if (arrayHelp[i]) {
            arrayHelp[i].forEach(function (data) {
                arrayTemp.push(data);
            });
        }
    }
    return arrayTemp;
}
function bucketSortRing(arrayInput) {
    var nNum = arrayInput.length;
    var nRange = 1.0 / nNum;
    var arrayTemp = [];
    for (var i = 0; i < arrayInput.length; ++i) {
        var nIndex = Math.floor(nNum * (arrayInput[i].x * arrayInput[i].x +
            arrayInput[i].y * arrayInput[i].y));
        if (!arrayTemp[nIndex]) {
            arrayTemp[nIndex] = [];
        }
        arrayTemp[nIndex].push(arrayInput[i]);
    }
    for (var i = 0; i < arrayTemp.length; ++i) {
        if (arrayTemp[i]) {
            arrayTemp[i].sort(function (data, data2) {
                return data.x * data.x + data.y * data.y - (data2.x * data2.x + data2.y * data2.y);
            });
        }
    }
    var arrayOut = [];
    for (var i = 0; i < arrayTemp.length; ++i) {
        if (arrayTemp[i]) {
            arrayTemp[i].forEach(function (item) {
                arrayOut.push(item);
            });
        }
    }
    return arrayOut;
}
var BucketSortCase = (function () {
    function BucketSortCase() {
    }
    BucketSortCase.prototype.testCaseBucketSort = function () {
        var arrayTest = utilitytools_1["default"].generateRandomArray(1, 10000, 100);
        var arraySorted = bucketSort(arrayTest.concat(), 1, 10000 + 1);
        console.log("" + arraySorted);
        this.checkSortRight(arraySorted, arrayTest);
    };
    BucketSortCase.prototype.testCaseBuckSort2 = function () {
        var nNum = utilitytools_1["default"].generateRandom(5, 200);
        var arrayTemp = this.generateArrayRingTest(nNum);
        console.log(arrayTemp);
        var arraySorted = bucketSortRing(arrayTemp);
        console.log(arraySorted);
        this.checkSortRight2(arraySorted, arrayTemp);
    };
    BucketSortCase.prototype.checkSortRight2 = function (arraySorted, arrayOgin) {
        var arrayToCheck = arrayOgin.concat().sort(function (a, b) {
            return a.x * a.x + a.y * a.y - (b.x * b.x + b.y * b.y);
        });
        if (arraySorted.length !== arrayToCheck.length) {
            console.log('array sorted num is not right!');
            return false;
        }
        for (var i = 0; i < arraySorted.length; ++i) {
            if (arraySorted[i] !== arrayToCheck[i]) {
                // 注意这里添加一个判断，防止振幅一致！！！
                if (arraySorted[i].x * arraySorted[i].x + arraySorted[i].y * arraySorted[i].y ===
                    arrayToCheck[i].x * arrayToCheck[i].x + arrayToCheck[i].y * arrayToCheck[i].y) {
                    continue;
                }
                console.log('array sorted error!!!');
                return false;
            }
        }
        console.log('array sort right!');
        return true;
    };
    BucketSortCase.prototype.checkSortRight = function (arraySorted, arrayOgin) {
        var arrayToCheck = arrayOgin.concat().sort(function (a, b) {
            return a - b;
        });
        if (arraySorted.length !== arrayToCheck.length) {
            console.log('array sorted num is not right!');
            return false;
        }
        for (var i = 0; i < arraySorted.length; ++i) {
            if (arraySorted[i] !== arrayToCheck[i]) {
                console.log('array sorted error!!!');
                return false;
            }
        }
        console.log('array sort right!');
        return true;
    };
    /**
     * 如何生成测试序列还是值得思考一下的，
     * 我是这样生成的，用幅度和角度做参数，其中
     * 幅度范围为(0,1),角度范围为(0,2*Pi)
     */
    BucketSortCase.prototype.generateArrayRingTest = function (nNum) {
        var arrayOut = [];
        for (var i = 0; i < nNum; ++i) {
            var nSwing = Math.random();
            var nAngle = Math.random() * 2 * Math.PI;
            arrayOut.push({
                x: nSwing * Math.cos(nAngle),
                y: nSwing * Math.sin(nAngle)
            });
        }
        return arrayOut;
    };
    return BucketSortCase;
}());
var Temp = new BucketSortCase();
Temp.testCaseBucketSort();
Temp.testCaseBuckSort2();
