"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMongeArrayRowMinRecurWrap(matrixInput) {
    var arrayOutput = [];
    var arrayTemp = [];
    for (var i = 0; i < matrixInput.row; ++i) {
        arrayOutput.push(0);
        arrayTemp.push(i);
    }
    getMongeArrayRowMinRecur({
        arrayRowId: arrayTemp,
        dataMatrix: matrixInput
    }, arrayOutput);
    return arrayOutput;
}
// 输出每一行最小值所在的列坐标
// interface Array
function getMongeArrayRowMinRecur(subMatrix, arrayOutPut) {
    if (subMatrix.arrayRowId.length > 1) {
        // 
        var arrayTemp = [];
        for (var i = 1; i < subMatrix.arrayRowId.length;) {
            arrayTemp.push(subMatrix.arrayRowId[i]);
            i = i + 2;
        }
        var subsubMatrix = {
            arrayRowId: arrayTemp,
            dataMatrix: subMatrix.dataMatrix
        };
        getMongeArrayRowMinRecur(subsubMatrix, arrayOutPut);
        // console.log(`arrayrowId is ${subMatrix.arrayRowId}`);
        for (var i = 0; i < subMatrix.arrayRowId.length; i = i + 2) {
            var rowId = subMatrix.arrayRowId[i];
            var TempMinArray = subMatrix.dataMatrix.dataMatrix[rowId];
            // console.log(`TempMinArray is ${TempMinArray}`);
            var nStart = 0;
            var nEnd = subMatrix.dataMatrix.col - 1;
            if (i - 1 >= 0) {
                nStart = arrayOutPut[subMatrix.arrayRowId[i - 1]];
            }
            if (i + 1 < subMatrix.arrayRowId.length) {
                nEnd = arrayOutPut[subMatrix.arrayRowId[i + 1]];
            }
            // console.log(`start is end is ${nStart},${nEnd}`);
            var MinLeft = nStart;
            for (var j = nStart; j <= nEnd; ++j) {
                if (TempMinArray[MinLeft] > TempMinArray[j]) {
                    MinLeft = j;
                }
            }
            arrayOutPut[subMatrix.arrayRowId[i]] = MinLeft;
            // console.log(`arrayOutput is ${arrayOutPut},row id is ${subMatrix.arrayRowId[i]},minlef is ${MinLeft}`);
        }
    }
    else {
        var Minleft = 0;
        var nRowId = subMatrix.arrayRowId[0];
        var ArrayTemp = subMatrix.dataMatrix.dataMatrix[nRowId];
        for (var i = 0; i < subMatrix.dataMatrix.col; ++i) {
            if (ArrayTemp[Minleft] > ArrayTemp[i]) {
                Minleft = i;
            }
        }
        arrayOutPut[nRowId] = Minleft;
    }
}
var MongeMatrixTestCase = /** @class */ (function () {
    function MongeMatrixTestCase() {
    }
    MongeMatrixTestCase.prototype.runTest = function () {
        this.testCase();
    };
    MongeMatrixTestCase.prototype.testCase = function () {
        var arrayTemp = [
            [10, 17, 13, 28, 23],
            [17, 22, 16, 29, 23],
            [24, 28, 22, 34, 24],
            [11, 13, 6, 17, 7],
            [45, 44, 32, 37, 23],
            [36, 33, 19, 21, 6],
            [75, 66, 51, 53, 34]
        ];
        var matrix = {
            col: 5,
            row: 7,
            dataMatrix: arrayTemp
        };
        var Temp = getMongeArrayRowMinRecurWrap(matrix);
        console.log("min items is " + Temp);
    };
    return MongeMatrixTestCase;
}());
var MongeTestCheck = new MongeMatrixTestCase();
exports.default = MongeTestCheck;
