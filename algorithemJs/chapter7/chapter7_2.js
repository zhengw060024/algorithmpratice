"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//这里的主要是思考题7.2 以及7.6，从本质上来说，其实他们算的上是同一个问题
// 思考题7.2考虑到含有相同元素的划分。
var utilitytools_1 = require("./utilitytools");
function quickDepart(arrayInput, nStartIndex, nEndIndex) {
    // 假设枢轴为nStartIndex
    var i = nStartIndex, j = nStartIndex + 1, k = nStartIndex;
    var nTemp = arrayInput[i];
    for (j = nStartIndex + 1; j <= nEndIndex; ++j) {
        if (arrayInput[j] < nTemp) {
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = arrayInput[++k];
            ++i;
        }
        else if (arrayInput[j] === nTemp) {
            //arrayInput[k] = arrayInput[j];
            // arrayInput[k] = nTemp;
            arrayInput[j] = arrayInput[++k];
        }
    }
    for (var t = i; t <= k; ++t) {
        arrayInput[t] = nTemp;
    }
    return [i, k];
}
// 算法导论思考题7.6,其本质上就是对有重复数据的排序 。 备注这是我一开始的想法后来才发现这种想法是错误的，
// 因为判断有重合点的range之后并不因为这些range有序，需要使用额外的判断来决定这些range的顺序
// 原因是：对于T类型a，b，c  a- b === 0， b -c ===0 并不能推导出
// a - c === 0,也是就，等号的传递性并不能满足，例如对于区域 a=[1,5],b=[3,9],c=[6,12]可以推导出
// a,b有交集，bc有交集，但是ac确实没有交集的。在这个线性空间内不满足等号的传递性。
function quickDepartTemplate(arrayInput, nStartIndex, nEndIndex, cmp) {
    // 假设枢轴为nStartIndex
    var tempAxis = arrayInput[nStartIndex];
    var i = nStartIndex, j = nStartIndex + 1, k = nStartIndex;
    for (j = nStartIndex + 1; j <= nEndIndex; ++j) {
        if (cmp(arrayInput[j], arrayInput[i]) < 0) {
            var nTemp = arrayInput[i];
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = arrayInput[++k];
            // 备注：加上的这些部分是为了保持i始终是枢轴。
            arrayInput[k] = arrayInput[++i];
            arrayInput[i] = nTemp;
        }
        else if (cmp(arrayInput[j], arrayInput[i]) === 0) {
            var nTemp = arrayInput[++k];
            arrayInput[k] = arrayInput[j];
            arrayInput[j] = nTemp;
        }
    }
    if (tempAxis !== arrayInput[i]) {
        throw new Error('axis changed!!!!');
    }
    return [i, k];
}
function quickSortImp(arrayInput, nStartIndex, nEndIndex, cmp) {
    while (nStartIndex < nEndIndex) {
        var nDepartArray = quickDepartTemplate(arrayInput, nStartIndex, nEndIndex, cmp);
        // 对较短端进行递归
        if (nDepartArray[0] - nStartIndex < nEndIndex - nDepartArray[1]) {
            quickSortImp(arrayInput, nDepartArray[1] + 1, nEndIndex, cmp);
            nEndIndex = nDepartArray[0] - 1;
        }
        else {
            quickSortImp(arrayInput, nStartIndex, nDepartArray[0] - 1, cmp);
            nStartIndex = nDepartArray[1] + 1;
        }
    }
}
function quickSort(arrayInput, cmp) {
    quickSortImp(arrayInput, 0, arrayInput.length - 1, cmp);
}
var NumRange = /** @class */ (function () {
    function NumRange(start, end, rangeId) {
        if (start > end) {
            throw new Error('illgel ranage');
        }
        this.m_start = start;
        this.m_end = end;
        this.m_rangeID = rangeId;
    }
    return NumRange;
}());
function generateTestRange(nMin, nMax, rangeNum) {
    var arrayTemp = [];
    for (var i = 0; i < rangeNum; ++i) {
        var nStart = utilitytools_1.default.generateRandom(nMin, nMax);
        var nEnd = utilitytools_1.default.generateRandom(nStart, nMax);
        arrayTemp.push(new NumRange(nStart, nEnd, i));
    }
    return arrayTemp;
}
// 算法导论7-6正确的解法：
function quickDepartRange(arrayInput, nStartIndex, nEndIndex) {
    // 假设枢轴为nStartIndex
    var cmp1 = function (a, b) {
        if (a.m_start <= b.m_start) {
            if (a.m_end >= b.m_start) {
                return 0;
            }
            return -1;
        }
        else {
            if (b.m_end >= a.m_start) {
                return 0;
            }
            return 1;
        }
    };
    // 这里需要特别注意一下，每一次归并之后都要修改一下枢轴！！！！！！！！！！
    // 这也是为什么不用quickSort的原因所在
    var tempAxis = new NumRange(arrayInput[nStartIndex].m_start, arrayInput[nStartIndex].m_end, arrayInput[nStartIndex].m_rangeID);
    var i = nStartIndex, j = nStartIndex + 1, kEnd = nStartIndex;
    var kStart = nStartIndex;
    for (j = nStartIndex + 1; j <= nEndIndex; ++j) {
        if (cmp1(arrayInput[j], tempAxis) < 0) {
            var nTemp = arrayInput[i];
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = arrayInput[++kEnd];
            // 备注：加上的这些部分是为了保持i始终是枢轴。
            arrayInput[kEnd] = arrayInput[++i];
            arrayInput[i] = nTemp;
        }
        else if (cmp1(arrayInput[j], tempAxis) === 0) {
            tempAxis.m_end = arrayInput[j].m_end < tempAxis.m_end ? arrayInput[j].m_end : tempAxis.m_end;
            tempAxis.m_start = arrayInput[j].m_start < tempAxis.m_start ? tempAxis.m_start : arrayInput[j].m_start;
            var nTemp = arrayInput[++kEnd];
            arrayInput[kEnd] = arrayInput[j];
            arrayInput[j] = nTemp;
        }
    }
    // if (tempAxis !== arrayInput[i]) {
    //     throw new Error('axis changed!!!!');
    // }
    console.log('划分的枢轴是：', [i, kEnd]);
    return [i, kEnd];
}
function quickSortImpRange(arrayInput, nStartIndex, nEndIndex) {
    while (nStartIndex < nEndIndex) {
        var nDepartArray = quickDepartRange(arrayInput, nStartIndex, nEndIndex);
        // 对较短端进行递归
        if (nDepartArray[0] - nStartIndex < nEndIndex - nDepartArray[1]) {
            quickSortImpRange(arrayInput, nDepartArray[1] + 1, nEndIndex);
            nEndIndex = nDepartArray[0] - 1;
        }
        else {
            quickSortImpRange(arrayInput, nStartIndex, nDepartArray[0] - 1);
            nStartIndex = nDepartArray[1] + 1;
        }
    }
}
function quickSortRange(arrayInput) {
    quickSortImpRange(arrayInput, 0, arrayInput.length - 1);
}
var TestCase = /** @class */ (function () {
    function TestCase() {
    }
    TestCase.prototype.testCase7_6 = function () {
        var arrayNum = utilitytools_1.default.generateRandom(500, 700);
        var arrayInput = generateTestRange(1, 2000, arrayNum);
        console.log("arrayNum is " + arrayNum);
        var arrayToSort = arrayInput.concat();
        quickSortRange(arrayToSort);
        // console.log(arrayToSort);
        var arrayToCheck = arrayInput.concat();
        var checkResult = this.checkRangeSort(arrayToSort, arrayToCheck);
        if (checkResult) {
            console.log('range sort right!!!');
        }
    };
    TestCase.prototype.checkRangeSort = function (arrayToSort, arrayToCheck) {
        // 检测顺序是否正确。
        var cmp1 = function (a, b) {
            if (a.m_start <= b.m_start) {
                if (a.m_end >= b.m_start) {
                    return 0;
                }
                return -1;
            }
            else {
                if (b.m_end >= a.m_start) {
                    return 0;
                }
                return 1;
            }
        };
        for (var i = 0; i < arrayToSort.length; ++i) {
            for (var j = i + 1; j < arrayToSort.length; ++j) {
                if (cmp1(arrayToSort[i], arrayToSort[j]) > 0) {
                    console.log('sequence order is not right!!!', i, j);
                    return false;
                }
            }
        }
        var cmp2 = function (a, b) {
            return a.m_rangeID - b.m_rangeID;
        };
        var arrayTemp = arrayToSort.concat();
        if (arrayTemp.length !== arrayToCheck.length) {
            console.log('sequece number is not right!!!');
            return false;
        }
        arrayTemp.sort(cmp2);
        arrayToCheck.sort(cmp2);
        for (var i = 0; i < arrayTemp.length; ++i) {
            if ((arrayTemp[i].m_rangeID !== arrayToCheck[i].m_rangeID) ||
                (arrayTemp[i].m_end !== arrayToCheck[i].m_end) ||
                (arrayTemp[i].m_start !== arrayToCheck[i].m_start)) {
                console.log('sequence item changed!!!');
                return false;
            }
        }
        return true;
    };
    TestCase.prototype.testDepart = function () {
        var ItemCount = utilitytools_1.default.generateRandom(5, 200);
        console.log('lenth is ', ItemCount);
        var arrayInput = utilitytools_1.default.generateRandomArray(1, 10, ItemCount);
        console.log("orgin array is " + arrayInput);
        var arrayToDepart = arrayInput.concat();
        var nReturnTuple = quickDepart(arrayToDepart, 0, arrayInput.length - 1);
        console.log("depart index is " + nReturnTuple + " ");
        console.log("departed array is " + arrayToDepart);
        var bCheckDepartSuccess = this.checkArrayDepartSuccess(arrayToDepart, arrayInput, nReturnTuple[0], nReturnTuple[1]);
        if (bCheckDepartSuccess) {
            console.log('check depart is success!!!');
        }
        else {
            console.log('check depart is error!!!');
        }
    };
    TestCase.prototype.testDepartTemplate = function () {
        var ItemCount = utilitytools_1.default.generateRandom(5, 200);
        console.log('lenth is ', ItemCount);
        var arrayInput = utilitytools_1.default.generateRandomArray(1, 10, ItemCount);
        console.log("orgin array is " + arrayInput);
        var arrayToDepart = arrayInput.concat();
        var cmp = function (a, b) {
            return a - b;
        };
        var nReturnTuple = quickDepartTemplate(arrayToDepart, 0, arrayInput.length - 1, cmp);
        console.log("depart index is " + nReturnTuple + " ");
        console.log("departed array is " + arrayToDepart);
        var bCheckDepartSuccess = this.checkArrayDepartSuccessTemplate(arrayToDepart, arrayInput, nReturnTuple[0], nReturnTuple[1], cmp);
        if (bCheckDepartSuccess) {
            console.log('check depart is success!!!');
        }
        else {
            console.log('check depart is error!!!');
        }
    };
    TestCase.prototype.testCaseQickSort = function () {
        var ItemCount = utilitytools_1.default.generateRandom(5, 200);
        console.log('lenth is ', ItemCount);
        var arrayInput = utilitytools_1.default.generateRandomArray(1, 1000, ItemCount);
        console.log("orgin array is " + arrayInput);
        var arrayToSort = arrayInput.concat();
        var cmp = function (a, b) {
            return b - a;
        };
        quickSort(arrayToSort, cmp);
        var arrayToCheck = arrayInput.concat().sort(cmp);
        // 检查排序合法性
        if (arrayToSort.length !== arrayToCheck.length) {
            console.log('quicksort failed!!!');
            return;
        }
        console.log("quick sort result is " + arrayToSort);
        console.log("right sequence is " + arrayToCheck);
        for (var i = 0; i < arrayToCheck.length; ++i) {
            if (cmp(arrayToCheck[i], arrayToSort[i]) !== 0) {
                console.log('quicksort failed!!!,some item sequence is not right');
                return;
            }
        }
        console.log('quickSort is right!!!');
    };
    TestCase.prototype.checkArrayDepartSuccess = function (arrayInput, arrayOrgin, rangeSameStart, rangeSameEnd) {
        if (arrayInput.length !== arrayOrgin.length) {
            return false;
        }
        for (var i = 0; i < rangeSameStart; ++i) {
            if (arrayInput[i] >= arrayInput[rangeSameStart]) {
                return false;
            }
        }
        for (var j = rangeSameEnd + 1; j < arrayInput.length; ++j) {
            if (arrayInput[j] <= arrayInput[rangeSameEnd]) {
                return false;
            }
        }
        for (var i = rangeSameStart; i <= rangeSameEnd; ++i) {
            if (arrayInput[i] != arrayInput[rangeSameStart]) {
                return false;
            }
        }
        var arrayInputTemp = arrayInput.sort(function (a, b) {
            return a - b;
        });
        var arrayOrginTemp = arrayInput.sort(function (a, b) {
            return a - b;
        });
        for (var i = 0; i < arrayInputTemp.length; ++i) {
            if (arrayInputTemp[i] !== arrayOrginTemp[i]) {
                return false;
            }
        }
        return true;
    };
    TestCase.prototype.checkArrayDepartSuccessTemplate = function (arrayInput, arrayOrgin, rangeSameStart, rangeSameEnd, cmp) {
        if (arrayInput.length !== arrayOrgin.length) {
            return false;
        }
        for (var i = 0; i < rangeSameStart; ++i) {
            if (cmp(arrayInput[i], arrayInput[rangeSameStart]) >= 0) {
                return false;
            }
        }
        for (var j = rangeSameEnd + 1; j < arrayInput.length; ++j) {
            if (cmp(arrayInput[j], arrayInput[rangeSameEnd]) <= 0) {
                return false;
            }
        }
        for (var i = rangeSameStart; i <= rangeSameEnd; ++i) {
            if (cmp(arrayInput[i], arrayInput[rangeSameStart]) !== 0) {
                return false;
            }
        }
        var arrayInputTemp = arrayInput.sort(cmp);
        var arrayOrginTemp = arrayInput.sort(cmp);
        for (var i = 0; i < arrayInputTemp.length; ++i) {
            if (arrayInputTemp[i] !== arrayOrginTemp[i]) {
                return false;
            }
        }
        return true;
    };
    TestCase.prototype.runTestCase = function () {
        this.testDepart();
        this.testDepartTemplate();
        this.testCaseQickSort();
        this.testCase7_6();
    };
    return TestCase;
}());
var testCaseItem = new TestCase();
exports.default = testCaseItem;
//testCaseItem.runTestCase(); 
