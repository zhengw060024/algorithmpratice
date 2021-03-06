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
// 思考题8-3的思考，对于整数，显然使用基数排序，但是对于基数排序，之前的实现是有些问题的，
// 之前的实现会将原来不存在的位数按照0index作为关键字排序，此外为了维持排序的稳定性，每次
// 计数排序的过程中都要讲数组拷贝一遍，这太消耗空间了，所以新写一个方法，使用不稳定的原址
// 计数排序方法，作为基数排序的基础。
// 这里注意下，设置一个数轴nStartIndex，表示最高位已经被处理的start index，nStartIndex
// 之前的数据均是有序。
// 我之前的想法是错误的，基数排序最重要的特点是计数排序必须是稳定的，所以8-3还是只能用基数排序来实现。
// 对于8-3的第二字符类的处理，采取桶排序方法处理。
// 对从a-z的字符做桶排序
function stringSort(arrayInput) {
    stringSortHelp(arrayInput, 0);
}
function stringSortHelp(arrayInput, nIndexStart) {
    var helpArray = [];
    if (arrayInput.length <= 1) {
        return;
    }
    for (var i = 0; i < arrayInput.length; ++i) {
        if (nIndexStart === arrayInput[i].length) {
            if (!helpArray[0]) {
                helpArray[0] = [];
            }
            helpArray[0].push(arrayInput[i]);
        }
        else {
            var nIndex = arrayInput[i].charCodeAt(nIndexStart) - 'a'.charCodeAt(0) + 1;
            if (!helpArray[nIndex]) {
                helpArray[nIndex] = [];
            }
            helpArray[nIndex].push(arrayInput[i]);
        }
    }
    ++nIndexStart;
    for (var i = 1; i < helpArray.length; ++i) {
        if (helpArray[i]) {
            stringSortHelp(helpArray[i], nIndexStart);
        }
    }
    // const arrayOut = [];
    var k = 0;
    for (var i = 0; i < helpArray.length; ++i) {
        if (helpArray[i]) {
            for (var j = 0; j < helpArray[i].length; ++j) {
                arrayInput[k] = helpArray[i][j];
                ++k;
            }
        }
    }
    // return arrayInput[];
}
// 算法导论思考题8-4
// n*n的算法很简单，考虑下n*lgn，使用类似快排的算法
// 在第1次配对时，取一个红色的水壶将蓝色的水壶分成两队，比次红色水壶大的
// 放右边，比它小的放左边。在将得到的对应的蓝色水壶红色水壶分成两队，然后在
// 对左边和右边的子水壶队列重复这个过程。
var Kettle_Color;
(function (Kettle_Color) {
    Kettle_Color[Kettle_Color["red"] = 0] = "red";
    Kettle_Color[Kettle_Color["blue"] = 1] = "blue";
})(Kettle_Color || (Kettle_Color = {}));
var Kettle = (function () {
    function Kettle(volume, color) {
        this.m_color = color;
        this.m_volume = volume;
    }
    return Kettle;
}());
function getKettlePairNN(arrayBlue, arrayRed) {
    var arrayOut = [];
    if (arrayBlue.length !== arrayRed.length) {
        throw new Error('Error input!');
    }
    else {
        for (var i = 0; i < arrayBlue.length; ++i) {
            for (var j = 0; j < arrayRed.length; ++j)
                if (arrayBlue[i].m_volume === arrayRed[j].m_volume) {
                    arrayOut.push([arrayBlue[i], arrayRed[j]]);
                }
        }
    }
    return arrayOut;
}
function getKettlePairLGN(arrayBlue, arrayRed) {
    getKettePairLGN_Imp(arrayBlue, arrayRed, 0, arrayBlue.length - 1);
}
// 该函数将对应的瓶子分成两组
function departKetteLGN(arrayBlue, arrayRed, startIndex, endIndex) {
    var bEqualHappen = false;
    var radix = arrayRed[startIndex];
    // j表示第一个大于radix的坐标
    var j = startIndex;
    //对蓝色瓶子进行划分
    for (var i = startIndex; i <= endIndex; ++i) {
        if (arrayBlue[i].m_volume < radix.m_volume) {
            if (bEqualHappen) {
                var nTemp = arrayBlue[i];
                arrayBlue[i] = arrayBlue[j];
                arrayBlue[j] = arrayBlue[j - 1];
                arrayBlue[j - 1] = nTemp;
            }
            else {
                var nTemp = arrayBlue[i];
                arrayBlue[i] = arrayBlue[j];
                arrayBlue[j] = nTemp;
            }
            //这里有问题
            ++j;
        }
        else if (arrayBlue[i].m_volume === radix.m_volume) {
            var temp = arrayBlue[j];
            arrayBlue[j] = arrayBlue[i];
            arrayBlue[i] = temp;
            bEqualHappen = true;
            ++j;
        }
    }
    // 对红色瓶子进行划分
    // console.log(j);
    radix = arrayBlue[j - 1];
    j = startIndex;
    for (var i = startIndex; i <= endIndex; ++i) {
        if (arrayRed[i].m_volume < radix.m_volume) {
            if (bEqualHappen) {
                var nTemp = arrayRed[i];
                arrayRed[i] = arrayRed[j];
                arrayRed[j] = arrayRed[j - 1];
                arrayRed[j - 1] = nTemp;
            }
            else {
                var nTemp = arrayRed[i];
                arrayRed[i] = arrayRed[j];
                arrayRed[j] = nTemp;
            }
            ++j;
        }
        else if (arrayRed[i].m_volume === radix.m_volume) {
            var temp = arrayRed[j];
            arrayRed[j] = arrayRed[i];
            arrayRed[i] = temp;
            bEqualHappen = true;
            ++j;
        }
    }
    // console.log(j);
    return j - 1;
}
function getKettePairLGN_Imp(arrayBlue, arrayRed, startIndex, endIndex) {
    if (startIndex < endIndex) {
        var middle = departKetteLGN(arrayBlue, arrayRed, startIndex, endIndex);
        getKettePairLGN_Imp(arrayBlue, arrayRed, startIndex, middle - 1);
        getKettePairLGN_Imp(arrayBlue, arrayRed, middle + 1, endIndex);
    }
}
// 算法导论思考题8-5：证明过程很简单，将两边的系数乘以k就可以了。
// 思路，按照k的间距，将数据分成k组，可以
// 将每组数据拷贝到不同数组进行排序，然后在整合起来，
// 也可以在原址上对每组进行排序，这样稍微有些复杂，中间要采用堆排序的方法，
// 这种方法需要注意边界条件的处理。
function averageSortSimple(arrayInput, k) {
    var arrayHelp = [];
    for (var i = 0; i < k; ++i) {
        arrayHelp.push([]);
    }
    for (var i = 0; i < arrayInput.length; ++i) {
        var nIndex = i % k;
        arrayHelp[nIndex].push(arrayInput[i]);
    }
    arrayHelp.forEach(function (item) {
        item.sort(function (a, b) {
            return a - b;
        });
    });
    var nTotal = 0;
    var arrayOut = [];
    var t = 0;
    while (true) {
        for (var i = 0; i < arrayHelp.length; ++i) {
            arrayOut.push(arrayHelp[i][t]);
            ++nTotal;
            if (nTotal === arrayInput.length) {
                return arrayOut;
            }
        }
        ++t;
    }
}
// 原址的方法
function averageSort(arrayInput, nKCount) {
    var nNum = Math.floor((arrayInput.length - 1) / nKCount);
    var nMod = (arrayInput.length - 1) % nKCount;
    for (var i = 0; i < nKCount; ++i) {
        if (i <= nMod) {
            heapSort(arrayInput, nNum, nKCount, i);
            // console.log(`${arrayInput}`);
        }
        else {
            heapSort(arrayInput, nNum - 1, nKCount, i);
        }
    }
}
function getTrueIndex(index, kCount, modNum) {
    return index * kCount + modNum;
}
function ajustMaxHeapNoRecur(arrayHeap, nStartIndex, nEndIndex, kCount, modNum) {
    while (nStartIndex < nEndIndex) {
        var leftChild = nStartIndex * 2 + 1;
        var rightChild = nStartIndex * 2 + 2;
        if (leftChild > nEndIndex) {
            return;
        }
        var nNextIndex = leftChild;
        if (rightChild <= nEndIndex) {
            if (arrayHeap[getTrueIndex(rightChild, kCount, modNum)] > arrayHeap[getTrueIndex(leftChild, kCount, modNum)]) {
                nNextIndex = rightChild;
            }
        }
        if (arrayHeap[getTrueIndex(nStartIndex, kCount, modNum)] < arrayHeap[getTrueIndex(nNextIndex, kCount, modNum)]) {
            var temp = arrayHeap[getTrueIndex(nStartIndex, kCount, modNum)];
            arrayHeap[getTrueIndex(nStartIndex, kCount, modNum)] = arrayHeap[getTrueIndex(nNextIndex, kCount, modNum)];
            arrayHeap[getTrueIndex(nNextIndex, kCount, modNum)] = temp;
            nStartIndex = nNextIndex;
        }
        else {
            return;
        }
    }
}
function makeMaxHeapNoRecur(arrayInput, nEndIndex, kCount, modNum) {
    var nStart = Math.floor((nEndIndex - 1) / 2);
    for (var index = nStart; index >= 0; --index) {
        ajustMaxHeapNoRecur(arrayInput, index, nEndIndex, kCount, modNum);
    }
}
function heapSort(arrayInput, nEndIndex, kCount, modNum) {
    makeMaxHeapNoRecur(arrayInput, nEndIndex, kCount, modNum);
    for (var i = nEndIndex; i > 0; --i) {
        var Temp = arrayInput[getTrueIndex(0, kCount, modNum)];
        arrayInput[getTrueIndex(0, kCount, modNum)] = arrayInput[getTrueIndex(i, kCount, modNum)];
        arrayInput[getTrueIndex(i, kCount, modNum)] = Temp;
        ajustMaxHeapNoRecur(arrayInput, 0, i - 1, kCount, modNum);
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
    // 测试算法导论思考题8-5
    IndexSortTestCase2.prototype.testCaseAverageSort = function () {
        var nCount = utilitytools_1["default"].generateRandom(10, 100);
        var nK = utilitytools_1["default"].generateRandom(2, Math.floor(nCount / 2));
        var arrayInput = utilitytools_1["default"].generateRandomArray(0, 1000, nCount);
        console.log("nCount is " + nCount + ",nK is " + nK);
        console.log("" + arrayInput);
        var arrayOut = averageSortSimple(arrayInput, nK);
        console.log("" + arrayOut);
        var arrayTest = arrayInput.concat();
        averageSort(arrayTest, nK);
        console.log("" + arrayTest);
        if (this.checkArrayAverageSort(arrayOut, nK)) {
            console.log('arrayaverage sort simple is right!');
        }
        if (this.checkArrayAverageSort(arrayTest, nK)) {
            console.log('arrayaverage sort right!');
        }
    };
    IndexSortTestCase2.prototype.checkArrayAverageSort = function (arrayInput, kCount) {
        for (var i = 0; i <= arrayInput.length - 1 - kCount; ++i) {
            if (arrayInput[i] > arrayInput[kCount + i]) {
                console.log('illegal order!!!');
                return false;
            }
        }
        return true;
    };
    IndexSortTestCase2.prototype.testCaseWordsSort = function () {
        var arrayInput = [];
        arrayInput.push('ab');
        arrayInput.push('a');
        arrayInput.push('b');
        arrayInput.push('fsdafsadf');
        arrayInput.push('xxxxxxxx');
        arrayInput.push('');
        arrayInput.push('fdsaf3dfdsaf');
        arrayInput.push('');
        arrayInput.push('dfdaf');
        arrayInput.push('tsdfasdf');
        arrayInput.push('hgdfdffds');
        var arrayTemp = arrayInput.concat();
        stringSort(arrayTemp);
        console.log("" + arrayTemp);
    };
    IndexSortTestCase2.prototype.testCaseKetteSort = function () {
        // 生成0-1000中的10个不同的数字
        var arrayNum = [];
        for (var i = 0; i < 1000; ++i) {
            arrayNum.push(i + 1);
        }
        var nTestNum = 10;
        for (var i = 0; i < nTestNum; ++i) {
            var nNum = utilitytools_1["default"].generateRandom(i, 999);
            var nTemp = arrayNum[i];
            arrayNum[i] = arrayNum[nNum];
            arrayNum[nNum] = nTemp;
        }
        // const arrayInputRed = [];
        var arrayInput = arrayNum.slice(0, nTestNum);
        //
        var arrayBlue = [];
        for (var i = 0; i < nTestNum; ++i) {
            arrayBlue.push(new Kettle(arrayInput[i], Kettle_Color.blue));
        }
        for (var i = 0; i < nTestNum; ++i) {
            var nNum = utilitytools_1["default"].generateRandom(i, nTestNum - 1);
            var nTemp = arrayInput[i];
            arrayInput[i] = arrayInput[nNum];
            arrayInput[nNum] = nTemp;
        }
        var arrayRed = [];
        for (var i = 0; i < nTestNum; ++i) {
            arrayRed.push(new Kettle(arrayInput[i], Kettle_Color.red));
        }
        var arrayResult = getKettlePairNN(arrayBlue, arrayRed);
        for (var i = 0; i < arrayResult.length; ++i) {
            console.log(arrayResult[i]);
        }
        console.log('fdsafsadf');
        getKettlePairLGN(arrayBlue, arrayRed);
        for (var i = 0; i < arrayBlue.length; ++i) {
            console.log([arrayBlue[i], arrayRed[i]]);
        }
    };
    IndexSortTestCase2.prototype.runTestCase = function () {
        this.testCaseItem();
        this.testCaseObjItem();
    };
    return IndexSortTestCase2;
}());
var tempCaseIndexSort = new IndexSortTestCase2();
// tempCaseIndexSort.testCaseWordsSort();
// tempCaseIndexSort.testCaseKetteSort();
tempCaseIndexSort.testCaseAverageSort();
