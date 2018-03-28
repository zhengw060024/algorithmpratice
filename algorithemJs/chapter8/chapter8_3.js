"use strict";
exports.__esModule = true;
var utilitytools_1 = require("./utilitytools");
// 算法导论思考题解答：
//#计数排序，原址排序方法，这种方法不是稳定的！！！！
function numIndexSort(arrayInput, nRangeMin, nRangeMax) {
    var arrayTemp = [];
    var arrayOut = [];
    var nRange = nRangeMax - nRangeMin + 1;
    for (var i_1 = 0; i_1 < nRange; ++i_1) {
        arrayTemp.push(0);
    }
    for (var i_2 = 0; i_2 < arrayInput.length; ++i_2) {
        arrayTemp[arrayInput[i_2] - nRangeMin] += 1;
    }
    for (var i_3 = 0; i_3 < nRange - 1; ++i_3) {
        arrayTemp[i_3 + 1] += arrayTemp[i_3];
    }
    var arrayTempSave = arrayTemp.concat();
    console.log("" + arrayTemp);
    console.log("" + arrayTempSave);
    var i = arrayInput.length - 1;
    // 解释：如果 a[i] 和 a[j]做了交换，也就是a[i]放在了j的位置：
    // 则有，j = arrayTemp[a[j]];  --arrayTemp[a[j]];则必有 j <= arrayTempOld[a[i]]
    // 且 j > arrayTemp[a[i]];而假如a[i]没做过交换，满足了这个条件，则a[i]直接在原位不用动
    // 这样既可排序
    var nCount = 0;
    while (i >= 0) {
        var nTemp2 = arrayTempSave[arrayInput[i] - nRangeMin] - 1;
        var nTemp1 = arrayTemp[arrayInput[i] - nRangeMin] - 1;
        if ((i >= nTemp1)
            && (i <= nTemp2)) {
            --i;
        }
        else {
            var temp = arrayInput[i];
            //console.log(arrayInput[i]);
            // 交换nID2和i位置的数组
            var nId2 = arrayTemp[arrayInput[i] - nRangeMin] - 1;
            if (nId2 < 0) {
                console.log('Error out of range');
                throw new Error('out of range!!!!!!');
            }
            console.log(temp, nId2, i);
            arrayInput[i] = arrayInput[nId2];
            arrayInput[nId2] = temp;
            arrayTemp[temp - nRangeMin] -= 1;
        }
    }
}
// 网上有种方法是，直接将对应位的数字写在对应位上，如注释所示，这种方式是错误的，
// 因为假若排序的是带关键字的对象，很明显，对象是无法直接缓存赋值的。
// 错误的方式！！！！,对于面对对象排序，假若获取的是index，这种排序是无效的！！！
function numIndexSortError(arrayInput, nRangeMin, nRangeMax) {
    var arrayTemp = [];
    var arrayTempSave = [];
    var arrayOut = [];
    var nRange = nRangeMax - nRangeMin + 1;
    for (var i = 0; i < nRange; ++i) {
        arrayTemp.push(0);
    }
    for (var i = 0; i < arrayInput.length; ++i) {
        arrayTemp[arrayInput[i] - nRangeMin] += 1;
    }
    for (var i = 0; i < nRange - 1; ++i) {
        arrayTemp[i + 1] += arrayTemp[i];
    }
    for (var i = 0; i < nRange - 1; ++i) {
        arrayTempSave.push(arrayTemp[i]);
    }
    console.log("" + arrayTemp);
    arrayInput[0] = nRangeMin;
    for (var i = nRange - 1; i > 0; --i) {
        while (arrayTemp[nRange] !== arrayTemp[nRange - 1]) {
            arrayInput[arrayTemp[nRange] - 1] = i + nRange;
            --arrayTemp[nRange];
        }
    }
}
function numIndexSortObj(arrayInput, nRangeMin, nRangeMax) {
    var arrayTemp = [];
    var arrayOut = [];
    var nRange = nRangeMax - nRangeMin + 1;
    for (var i_4 = 0; i_4 < nRange; ++i_4) {
        arrayTemp.push(0);
    }
    for (var i_5 = 0; i_5 < arrayInput.length; ++i_5) {
        arrayTemp[arrayInput[i_5].m_key - nRangeMin] += 1;
    }
    for (var i_6 = 0; i_6 < nRange - 1; ++i_6) {
        arrayTemp[i_6 + 1] += arrayTemp[i_6];
    }
    var arrayTempSave = arrayTemp.concat();
    console.log("" + arrayTemp);
    console.log("" + arrayTempSave);
    var i = arrayInput.length - 1;
    // 解释：如果 a[i] 和 a[j]做了交换，也就是a[i]放在了j的位置：
    // 则有，j = arrayTemp[a[j]];  --arrayTemp[a[j]];则必有 j <= arrayTempOld[a[i]]
    // 且 j > arrayTemp[a[i]];而假如a[i]没做过交换，满足了这个条件，则a[i]直接在原位不用动
    // 这样既可排序
    var nCount = 0;
    while (i >= 0) {
        var nTemp2 = arrayTempSave[arrayInput[i].m_key - nRangeMin] - 1;
        var nTemp1 = arrayTemp[arrayInput[i].m_key - nRangeMin] - 1;
        if ((i >= nTemp1)
            && (i <= nTemp2)) {
            --i;
        }
        else {
            var temp = arrayInput[i];
            //console.log(arrayInput[i]);
            // 交换nID2和i位置的数组
            var nId2 = arrayTemp[arrayInput[i].m_key - nRangeMin] - 1;
            if (nId2 < 0) {
                console.log('Error out of range');
                throw new Error('out of range!!!!!!');
            }
            // console.log(temp,nId2,i);
            arrayInput[i] = arrayInput[nId2];
            arrayInput[nId2] = temp;
            arrayTemp[temp.m_key - nRangeMin] -= 1;
        }
    }
}
var TestTempItem = (function () {
    function TestTempItem(key, id) {
        this.m_key = key;
        this.m_singleFlag = id;
    }
    return TestTempItem;
}());
var IndexSortTestCase2 = (function () {
    function IndexSortTestCase2() {
    }
    IndexSortTestCase2.prototype.testCaseItem = function () {
        var nMin = -10;
        var nMax = 20;
        var nCount = 200;
        var arrayInput = utilitytools_1["default"].generateRandomArray(nMin, nMax, nCount);
        console.log("" + arrayInput);
        var arrayOut = arrayInput.concat();
        numIndexSort(arrayOut, nMin, nMax);
        var arrayCheck = arrayInput.concat().sort(function (a, b) {
            return a - b;
        });
        console.log("" + arrayOut);
        if (arrayCheck.length !== arrayOut.length) {
            console.log('sort failed!!!');
            return false;
        }
        else {
            for (var i = 0; i < arrayCheck.length; ++i) {
                if (arrayCheck[i] !== arrayOut[i]) {
                    console.log('sort failed!!!');
                    return false;
                }
            }
        }
        console.log('sort right!!');
        return true;
    };
    IndexSortTestCase2.prototype.generateObjTempArray = function (nMin, nMax, nCount) {
        var arrayOut = [];
        var arrayInput = utilitytools_1["default"].generateRandomArray(nMin, nMax, nCount);
        for (var i = 0; i < arrayInput.length; ++i) {
            arrayOut.push(new TestTempItem(arrayInput[i], i));
        }
        return arrayOut;
    };
    IndexSortTestCase2.prototype.testCaseObjItem = function () {
        var nMin = 1;
        var nMax = 40;
        var nCount = 200;
        var arrayTest = this.generateObjTempArray(nMin, nMax, nCount);
        var arraySorted = arrayTest.concat();
        numIndexSortObj(arraySorted, nMin, nMax);
        this.checkArrayObjSortRight(arraySorted, arrayTest);
    };
    IndexSortTestCase2.prototype.checkArrayObjSortRight = function (arraySorted, arrayOrgin) {
        if (arraySorted.length !== arrayOrgin.length) {
            console.log('array length is not equal!!!');
            return false;
        }
        for (var i = 1; i < arraySorted.length; ++i) {
            if (arraySorted[i - 1].m_key > arraySorted[i].m_key) {
                console.log('array order is not right!!!');
                return false;
            }
        }
        var arrayTemp1 = arraySorted.concat().sort(function (data1, data2) {
            return data1.m_singleFlag - data2.m_singleFlag;
        });
        var arrayTemp2 = arrayOrgin.concat().sort(function (data1, data2) {
            return data1.m_singleFlag - data2.m_singleFlag;
        });
        for (var i = 0; i < arrayTemp1.length; ++i) {
            if (arrayTemp1[i].m_singleFlag !== arrayTemp2[i].m_singleFlag ||
                arrayTemp1[i].m_key !== arrayTemp2[i].m_key) {
                console.log('array item change!!!');
                return false;
            }
        }
        console.log('array sorted right!!!');
        return true;
    };
    IndexSortTestCase2.prototype.runTestCase = function () {
        this.testCaseItem();
        this.testCaseObjItem();
    };
    return IndexSortTestCase2;
}());
var tempCaseIndexSort = new IndexSortTestCase2();
tempCaseIndexSort.runTestCase();
