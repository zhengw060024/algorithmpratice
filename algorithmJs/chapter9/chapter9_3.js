"use strict";
exports.__esModule = true;
var utilitytools_1 = require("./utilitytools");
/**
 * 辅助函数插入排序
 * @param arrayInput
 * @param begin
 * @param end
 */
function insertSort(arrayInput, begin, end) {
    for (var i = begin; i < end; ++i) {
        var j = i + 1;
        if (arrayInput[begin] > arrayInput[j]) {
            var nTemp = arrayInput[j];
            while (j > begin) {
                arrayInput[j] = arrayInput[j - 1];
                --j;
            }
            arrayInput[j] = nTemp;
        }
        else {
            var nTemp = arrayInput[j];
            while (arrayInput[j - 1] > nTemp) {
                arrayInput[j] = arrayInput[j - 1];
                --j;
            }
            arrayInput[j] = nTemp;
        }
    }
}
/**
 * 测试插入排序代码
 */
// function checkArraySame(arrayInput:Array<number>,arrayTest:Array<number>) {
//     if(arrayInput.length === arrayTest.length) {
//         for(let i = 0; i < arrayTest.length; ++i) {
//             if(arrayInput[i] !== arrayTest[i]) {
//                 return false;
//             }
//         }
//         return true;
//     }
//     return false;
// }
// let arrayToTest = utilityTools.generateRandomArray(0,10,20);
// let arrayToCheck = arrayToTest.concat();
// insertSort(arrayToCheck,0,19);
// console.log(arrayToCheck);
// let checkResult = checkArraySame(arrayToTest.concat().sort((a,b) => {
//     return a  -b;
// }),arrayToCheck);
// console.log(checkResult);
//线性时间的中位数查找算法
function findKItem(arrayInput, nIndex) {
    var nKSquenceNum = _findKItem_help(arrayInput, 0, arrayInput.length - 1, nIndex);
    return nKSquenceNum;
}
/**
 *
 * @param arrayInput
 * @param nBegin
 * @param nEnd
 * @param nNum
 */
function departIndex(arrayInput, nBegin, nEnd, nNum) {
    // j表示第一个可能大于等于nNum的位置
    var i = nBegin;
    var j = nBegin;
    var k = -1;
    for (; i <= nEnd; ++i) {
        if (arrayInput[i] < nNum) {
            // swap(pos[i],pos[j]) ++j;
            var nTemp_1 = arrayInput[i];
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = nTemp_1;
            if (k === j)
                k = i;
            ++j;
        }
        else if (arrayInput[i] == nNum) {
            k = i;
        }
    }
    var nTemp = arrayInput[j];
    arrayInput[j] = arrayInput[k];
    arrayInput[k] = nTemp;
    return j;
}
function departIndex2(arrayInput, nBegin, nEnd, nNum) {
    // j表示第一个可能大于等于nNum的位置
    var i = nBegin;
    var j = nBegin;
    for (; i <= nEnd; ++i) {
        if (arrayInput[i] < nNum) {
            // swap(pos[i],pos[j]) ++j;
            var nTemp = arrayInput[i];
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = nTemp;
            ++j;
        }
    }
    return j;
}
function _findKItem_help(arrayInput, beginIndex, endIndex, nIndex) {
    var nDepartFive = Math.floor((endIndex - beginIndex) / 5);
    if (nDepartFive === 0) {
        insertSort(arrayInput, beginIndex, endIndex);
        if (nIndex < beginIndex || nIndex > endIndex) {
            var strTemp = "item" + nIndex;
            throw new Error(" error index " + strTemp);
        }
        return arrayInput[nIndex];
    }
    var arrayTemp = [];
    for (var j = 0; j < nDepartFive; ++j) {
        insertSort(arrayInput, j * 5 + beginIndex, (j + 1) * 5 - 1);
        var nIdMid_1 = j * 5 + beginIndex + 2;
        arrayTemp.push(arrayInput[nIdMid_1]);
    }
    insertSort(arrayInput, nDepartFive * 5 + beginIndex, endIndex);
    var nIdMid = Math.floor((endIndex + nDepartFive * 5 + beginIndex) / 2);
    arrayTemp.push(arrayInput[nIdMid]);
    var nDepartNum = _findKItem_help(arrayTemp, 0, arrayTemp.length - 1, Math.floor((arrayTemp.length - 1) / 2));
    // 如果要是采用这种分割方式得注意数轴，mid+1，mid-1的分割要求的是数轴必须
    // 是当前分割的number
    var nDepartIndex = departIndex(arrayInput, beginIndex, endIndex, nDepartNum);
    if (nDepartIndex < nIndex) {
        return _findKItem_help(arrayInput, nDepartIndex + 1, endIndex, nIndex);
    }
    else if (nDepartIndex > nIndex) {
        return _findKItem_help(arrayInput, beginIndex, nDepartIndex - 1, nIndex);
    }
    else {
        return arrayInput[nDepartIndex];
    }
}
function runtest() {
    var arrayToTest = utilitytools_1["default"].generateRandomArray(0, 10, 20);
    console.log(arrayToTest);
    var arrayToCheck = arrayToTest.concat();
    // let nIndex = departIndex(arrayToCheck,0,19,arrayToTest[0]);
    // console.log(arrayToCheck);
    // console.log(nIndex);
    // console.log(arrayToCheck.concat().sort( (a,b) => {
    //     return a- b;
    // }));
    // console.log(arrayToTest.concat().sort( (a,b) => {
    //     return a- b;
    // }));
    var kitem = findKItem(arrayToCheck.concat(), 10);
    arrayToCheck.sort(function (a, b) {
        return a - b;
    });
    console.log(kitem);
    console.log(arrayToCheck);
    console.log(arrayToCheck[10]);
}
runtest();
