"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilitytools_1 = require("./utilitytools");
function generateRandomMatrix(row, col) {
    var dataMatrix = [];
    for (var i = 0; i < row; ++i) {
        var tempArray = [];
        for (var j = 0; j < col; ++j) {
            tempArray.push(utilitytools_1.default.generateRandom(0, 9));
        }
        dataMatrix.push(tempArray);
    }
    return {
        row: row,
        col: col,
        dataMatrix: dataMatrix
    };
}
function printMatrix(dataMatrix) {
    console.log('output begin');
    for (var i = 0; i < dataMatrix.dataMatrix.length; ++i) {
        var temp = dataMatrix.dataMatrix[i];
        console.log("" + temp);
    }
    console.log('output complete');
}
function addMatrix(data1, data2) {
    if (data1.col !== data2.col || data2.row !== data1.row) {
        throw new Error('error ! the two matrix is not the same row and line!');
    }
    var dataMatrix = [];
    for (var i = 0; i < data1.row; ++i) {
        // const tempArray1 = data1.dataMatrix[i];
        // const tempArray2 = data2.dataMatrix[i]
        var TempArray = [];
        for (var j = 0; j < data1.col; ++j) {
            var temp = data1.dataMatrix[i][j] + data2.dataMatrix[i][j];
            TempArray.push(temp);
        }
        dataMatrix.push(TempArray);
    }
    return {
        row: data1.row,
        col: data1.col,
        dataMatrix: dataMatrix
    };
}
function mulMatrixBrute(data1, data2) {
    if (data1.col !== data2.row) {
        throw new Error('error! illegal operate!');
    }
    var dataMatrix = [];
    for (var i = 0; i < data1.row; ++i) {
        var TempArray = [];
        for (var j = 0; j < data2.col; ++j) {
            var Temp = 0;
            for (var k = 0; k < data1.col; ++k) {
                Temp += data1.dataMatrix[i][k] * data2.dataMatrix[k][j];
            }
            TempArray.push(Temp);
        }
        dataMatrix.push(TempArray);
    }
    return {
        row: data1.row,
        col: data2.col,
        dataMatrix: dataMatrix
    };
}
var temp1 = generateRandomMatrix(4, 6);
printMatrix(temp1);
console.log('--------------------');
var temp2 = generateRandomMatrix(4, 6);
printMatrix(temp2);
console.log('fffffffffffffffffff');
var temp3 = addMatrix(temp1, temp2);
printMatrix(temp3);
var Temp4 = generateRandomMatrix(6, 4);
printMatrix(Temp4);
var Temp5 = mulMatrixBrute(temp1, Temp4);
printMatrix(Temp5);
