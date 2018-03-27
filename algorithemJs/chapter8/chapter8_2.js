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
// 习题8-4-5：
// 思路如下：假设概率分布函数为p(x),则概率分布函数一定是取值范围[0,1]且递增的
// 如果待排序数组有n个，将[0,1]分割成n个区间，通过待排序的数值x[i]计算p(x[i]),
// 然后根据p(x[i])的值划归x[i]所属的区间（ 利用单调递增性,保证排序有效性）
// 这个代码的测试程序不太好编写，主要是不好生成随机变量。
// 备注：一般的方法是先产生[0,1]均匀分布随机数,
// 然后利用分布函数的反函数求对应的随机数.离散情形和连续情形有所不同。 
// 例如指数分布F(X)=1-EXP(-aX),反函数为S(U)=-(1/a)ln(1-u),先产生[0,1]均匀分布随机数u，
// 带入S(u），得到指数分布随机数。
/**
 * 此处是我模拟的一个概率分布函数,注意此概率分布函数要是单调递增的
 * @param x
 */
function getPx(x) {
    return 1 - Math.exp(-0.5 * x);
}
function getEx(nNum) {
    var arrayOut = [];
    for (var i = 0; i < nNum; ++i) {
        var nRandom = Math.random();
        // S(U)=-(1/a)ln(1-u)
        var temp = -2 * Math.log(1 - nRandom);
        arrayOut.push(temp);
    }
    return arrayOut;
}
function bucketSortP(arrayInput) {
    var nNum = arrayInput.length;
    var nRange = 1.0 / nNum;
    var arrayTemp = [];
    for (var i = 0; i < arrayInput.length; ++i) {
        var nIndex = Math.floor(nNum * getPx(arrayInput[i]));
        if (!arrayTemp[nIndex]) {
            arrayTemp[nIndex] = [];
        }
        arrayTemp[nIndex].push(arrayInput[i]);
    }
    for (var i = 0; i < arrayTemp.length; ++i) {
        // console.log(arrayTemp[i]);
        if (arrayTemp[i]) {
            arrayTemp[i].sort(function (data, data2) {
                return data - data2;
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
    /**
     * 测试算法导论习题8-4-5
     */
    BucketSortCase.prototype.testCasePxSort = function () {
        var arrayInput = getEx(1000);
        // console.log(arrayInput);
        var arraySort = bucketSortP(arrayInput);
        // console.log(arraySort);
        this.checkSortRight(arraySort, arrayInput);
    };
    BucketSortCase.prototype.testCaseRanGenerate = function () {
        // 生成10000个随机数，然后看下按照桶的划分其分布是否均匀。
        var arrayInput = getEx(10000);
        // console.log(`${arrayInput}`);
        var nNum = 10;
        var nRange = 1.0 / nNum;
        var arrayTemp = [];
        for (var i = 0; i < arrayInput.length; ++i) {
            var nIndex = Math.floor(nNum * getPx(arrayInput[i]));
            // console.log(nIndex);
            if (!arrayTemp[nIndex]) {
                arrayTemp[nIndex] = [];
            }
            arrayTemp[nIndex].push(arrayInput[i]);
        }
        console.log('fdsaf');
        for (var i = 0; i < arrayTemp.length; ++i) {
            console.log(arrayTemp[i].length);
        }
    };
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
Temp.testCaseRanGenerate();
Temp.testCasePxSort();
