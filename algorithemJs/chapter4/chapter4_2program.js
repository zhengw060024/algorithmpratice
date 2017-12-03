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
function subMatrix(data1, data2) {
    if (data1.col !== data2.col || data2.row !== data1.row) {
        throw new Error('error ! the two matrix is not the same row and line!');
    }
    var dataMatrix = [];
    for (var i = 0; i < data1.row; ++i) {
        // const tempArray1 = data1.dataMatrix[i];
        // const tempArray2 = data2.dataMatrix[i]
        var TempArray = [];
        for (var j = 0; j < data1.col; ++j) {
            var temp = data1.dataMatrix[i][j] - data2.dataMatrix[i][j];
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
/**
 * 确保两个相乘的矩阵的秩为2的k次方
 * @param dataMatrix1
 * @param dataMatrix2
 */
function mulMatrixStrassen1(dataMatrix1, dataMatrix2) {
    return mulMatrixStrassenHelp({
        dataMatrix: dataMatrix1,
        departInfo: {
            nRank: dataMatrix1.col,
            colPading: 0,
            rowPading: 0
        }
    }, {
        dataMatrix: dataMatrix2,
        departInfo: {
            nRank: dataMatrix2.col,
            colPading: 0,
            rowPading: 0
        }
    });
}
function subMatrixHelp(dataMatrix1, dataMatrix2) {
    var dataMatrix = [];
    var padingArow = dataMatrix1.departInfo.rowPading;
    var padingAcol = dataMatrix1.departInfo.colPading;
    var padingBrow = dataMatrix2.departInfo.rowPading;
    var padingBcol = dataMatrix2.departInfo.colPading;
    for (var i = 0; i < dataMatrix1.departInfo.nRank; ++i) {
        // const tempArray1 = data1.dataMatrix[i];
        // const tempArray2 = data2.dataMatrix[i]
        var TempArray = [];
        for (var j = 0; j < dataMatrix1.departInfo.nRank; ++j) {
            var temp = dataMatrix1.dataMatrix.dataMatrix[i + padingArow][j + padingAcol] - dataMatrix2.dataMatrix.dataMatrix[i + padingBrow][j + padingBcol];
            TempArray.push(temp);
        }
        dataMatrix.push(TempArray);
    }
    return {
        dataMatrix: {
            row: dataMatrix1.departInfo.nRank,
            col: dataMatrix1.departInfo.nRank,
            dataMatrix: dataMatrix
        },
        departInfo: {
            nRank: dataMatrix1.departInfo.nRank,
            colPading: 0,
            rowPading: 0
        }
    };
}
function addMatrixHelp(dataMatrix1, dataMatrix2) {
    var dataMatrix = [];
    var padingArow = dataMatrix1.departInfo.rowPading;
    var padingAcol = dataMatrix1.departInfo.colPading;
    var padingBrow = dataMatrix2.departInfo.rowPading;
    var padingBcol = dataMatrix2.departInfo.colPading;
    for (var i = 0; i < dataMatrix1.departInfo.nRank; ++i) {
        // const tempArray1 = data1.dataMatrix[i];
        // const tempArray2 = data2.dataMatrix[i]
        var TempArray = [];
        for (var j = 0; j < dataMatrix1.departInfo.nRank; ++j) {
            var temp = dataMatrix1.dataMatrix.dataMatrix[i + padingArow][j + padingAcol] + dataMatrix2.dataMatrix.dataMatrix[i + padingBrow][j + padingBcol];
            TempArray.push(temp);
        }
        dataMatrix.push(TempArray);
    }
    return {
        dataMatrix: {
            row: dataMatrix1.departInfo.nRank,
            col: dataMatrix1.departInfo.nRank,
            dataMatrix: dataMatrix
        },
        departInfo: {
            nRank: dataMatrix1.departInfo.nRank,
            colPading: 0,
            rowPading: 0
        }
    };
}
function mulMatrixStrassenHelp(dataMatrix1, dataMatrix2) {
    if (dataMatrix1.departInfo.nRank !== dataMatrix2.departInfo.nRank) {
        throw new Error('can not mul the  matrixs');
    }
    var ArrayTemp = [];
    // 记住起始点不是0,0 而是偏移地址，因为这个计算的矩阵实质上并没有被创建，只是用索引分割
    if (dataMatrix1.departInfo.nRank === 1) {
        var rowAPading = dataMatrix1.departInfo.rowPading;
        var colAPading = dataMatrix1.departInfo.colPading;
        var rowBPading = dataMatrix2.departInfo.rowPading;
        var colBPading = dataMatrix2.departInfo.colPading;
        var subArray = [];
        subArray.push((dataMatrix1.dataMatrix.dataMatrix)[rowAPading][colAPading] * (dataMatrix2.dataMatrix.dataMatrix)[rowBPading][colBPading]);
        ArrayTemp.push(subArray);
        return {
            row: 1,
            col: 1,
            dataMatrix: ArrayTemp
        };
    }
    else {
        // 划分矩阵
        var nSubMatrixRank = dataMatrix1.departInfo.nRank / 2;
        var A11 = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading,
                colPading: dataMatrix1.departInfo.colPading,
            }
        };
        var A12 = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading,
                colPading: dataMatrix1.departInfo.colPading + nSubMatrixRank,
            }
        };
        var A21 = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix1.departInfo.colPading,
            }
        };
        var A22 = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix1.departInfo.colPading + nSubMatrixRank,
            }
        };
        /////////////////划分B//////////////////////////////////////////////
        var B11 = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading,
                colPading: dataMatrix2.departInfo.colPading,
            }
        };
        var B12 = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading,
                colPading: dataMatrix2.departInfo.colPading + nSubMatrixRank,
            }
        };
        var B21 = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix2.departInfo.colPading,
            }
        };
        var B22 = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix2.departInfo.colPading + nSubMatrixRank,
            }
        };
        //计算S1 -S10
        //s1= b12 - b22
        var S1 = subMatrixHelp(B12, B22);
        //s2 = a11 + a12
        var S2 = addMatrixHelp(A11, A12);
        //s3 = a21 + a22
        var S3 = addMatrixHelp(A21, A22);
        //s4 = b21 - b11
        var S4 = subMatrixHelp(B21, B11);
        //s5 = a11 + a22
        var S5 = addMatrixHelp(A11, A22);
        //s6 = b11 + b22
        var S6 = addMatrixHelp(B11, B22);
        //s7 = a12 - a22
        var S7 = subMatrixHelp(A12, A22);
        //s8 = b21 + b22
        var S8 = addMatrixHelp(B21, B22);
        //s9 = a11 - a21
        var S9 = subMatrixHelp(A11, A21);
        //s10 = b11 + b12
        var S10 = addMatrixHelp(B11, B12);
        ///////////////////////////////
        // p1 = a11*s1
        var P1 = mulMatrixStrassenHelp(A11, S1);
        // printMatrix(P1);
        // p2 = s2*b22
        var P2 = mulMatrixStrassenHelp(S2, B22);
        // printMatrix(P2);
        // p3 = s3 * b11
        var P3 = mulMatrixStrassenHelp(S3, B11);
        // printMatrix(P3);
        // p4 = a22* s4
        var P4 = mulMatrixStrassenHelp(A22, S4);
        // printMatrix(P4);
        // p5 = s5 * s6
        var P5 = mulMatrixStrassenHelp(S5, S6);
        // printMatrix(P5);
        // p6 = s7 * s8
        var P6 = mulMatrixStrassenHelp(S7, S8);
        // printMatrix(P6);
        // p7 = s9 * s10
        var P7 = mulMatrixStrassenHelp(S9, S10);
        // printMatrix(P7);
        ////////////////////////////////////
        var ArrayTemp_1 = [];
        for (var i = 0; i < dataMatrix1.departInfo.nRank; ++i) {
            var arrayRowItem = [];
            for (var j = 0; j < dataMatrix1.departInfo.nRank; ++j) {
                if (i < nSubMatrixRank && j < nSubMatrixRank) {
                    var Temp = P5.dataMatrix[i][j] + P4.dataMatrix[i][j] - P2.dataMatrix[i][j] + P6.dataMatrix[i][j];
                    arrayRowItem.push(Temp);
                    //c11 = p5 + p4 -p2 + p6
                }
                else if (i < nSubMatrixRank && j >= nSubMatrixRank) {
                    //c12 = p1 + p2
                    var t = j - nSubMatrixRank;
                    var Temp = P1.dataMatrix[i][t] + P2.dataMatrix[i][t];
                    arrayRowItem.push(Temp);
                }
                else if (i >= nSubMatrixRank && j < nSubMatrixRank) {
                    //c21 = p3 + p4
                    var k = i - nSubMatrixRank;
                    var Temp = P3.dataMatrix[k][j] + P4.dataMatrix[k][j];
                    arrayRowItem.push(Temp);
                }
                else {
                    //c22 = p5 + p1 - p3 - p7
                    var k = i - nSubMatrixRank;
                    var t = j - nSubMatrixRank;
                    var Temp = P5.dataMatrix[k][t] + P1.dataMatrix[k][t] - P3.dataMatrix[k][t] - P7.dataMatrix[k][t];
                    arrayRowItem.push(Temp);
                }
            }
            ArrayTemp_1.push(arrayRowItem);
        }
        return {
            row: dataMatrix1.departInfo.nRank,
            col: dataMatrix1.departInfo.nRank,
            dataMatrix: ArrayTemp_1
        };
    }
}
/////////处理非2的k次方的情况//////////////////////
/**
 * 不需要矩阵的秩为2的k次方
 * @param dataMatrix1
 * @param dataMatrix2
 */
function mulMatrixStrassen2(dataMatrix1, dataMatrix2) {
    return mulMatrixStrassenHelpCommon({
        dataMatrix: dataMatrix1,
        departInfo: {
            nRank: dataMatrix1.col,
            colPading: 0,
            rowPading: 0
        }
    }, {
        dataMatrix: dataMatrix2,
        departInfo: {
            nRank: dataMatrix2.col,
            colPading: 0,
            rowPading: 0
        }
    });
}
function subMatrixHelpCommon(dataMatrix1, dataMatrix2) {
    var dataMatrix = [];
    var padingArow = dataMatrix1.departInfo.rowPading;
    var padingAcol = dataMatrix1.departInfo.colPading;
    var padingBrow = dataMatrix2.departInfo.rowPading;
    var padingBcol = dataMatrix2.departInfo.colPading;
    for (var i = 0; i < dataMatrix1.departInfo.nRank; ++i) {
        // const tempArray1 = data1.dataMatrix[i];
        // const tempArray2 = data2.dataMatrix[i]
        var TempArray = [];
        for (var j = 0; j < dataMatrix1.departInfo.nRank; ++j) {
            // 这里做个判断，如果读取越界了，就直接置 0；
            var Aij = 0;
            var Bij = 0;
            if (i + padingArow < dataMatrix1.dataMatrix.row && j + padingAcol < dataMatrix1.dataMatrix.col) {
                Aij = dataMatrix1.dataMatrix.dataMatrix[i + padingArow][j + padingAcol];
            }
            if (i + padingBrow < dataMatrix2.dataMatrix.row && j + padingBcol < dataMatrix2.dataMatrix.col) {
                Bij = dataMatrix2.dataMatrix.dataMatrix[i + padingBrow][j + padingBcol];
                ;
            }
            var temp = Aij - Bij;
            TempArray.push(temp);
        }
        dataMatrix.push(TempArray);
    }
    return {
        dataMatrix: {
            row: dataMatrix1.departInfo.nRank,
            col: dataMatrix1.departInfo.nRank,
            dataMatrix: dataMatrix
        },
        departInfo: {
            nRank: dataMatrix1.departInfo.nRank,
            colPading: 0,
            rowPading: 0
        }
    };
}
function addMatrixHelpCommon(dataMatrix1, dataMatrix2) {
    var dataMatrix = [];
    var padingArow = dataMatrix1.departInfo.rowPading;
    var padingAcol = dataMatrix1.departInfo.colPading;
    var padingBrow = dataMatrix2.departInfo.rowPading;
    var padingBcol = dataMatrix2.departInfo.colPading;
    for (var i = 0; i < dataMatrix1.departInfo.nRank; ++i) {
        // const tempArray1 = data1.dataMatrix[i];
        // const tempArray2 = data2.dataMatrix[i]
        var TempArray = [];
        for (var j = 0; j < dataMatrix1.departInfo.nRank; ++j) {
            var Aij = 0;
            var Bij = 0;
            if (i + padingArow < dataMatrix1.dataMatrix.row && j + padingAcol < dataMatrix1.dataMatrix.col) {
                Aij = dataMatrix1.dataMatrix.dataMatrix[i + padingArow][j + padingAcol];
            }
            if (i + padingBrow < dataMatrix2.dataMatrix.row && j + padingBcol < dataMatrix2.dataMatrix.col) {
                Bij = dataMatrix2.dataMatrix.dataMatrix[i + padingBrow][j + padingBcol];
                ;
            }
            var temp = Aij + Bij;
            TempArray.push(temp);
        }
        dataMatrix.push(TempArray);
    }
    return {
        dataMatrix: {
            row: dataMatrix1.departInfo.nRank,
            col: dataMatrix1.departInfo.nRank,
            dataMatrix: dataMatrix
        },
        departInfo: {
            nRank: dataMatrix1.departInfo.nRank,
            colPading: 0,
            rowPading: 0
        }
    };
}
function mulMatrixStrassenHelpCommon(dataMatrix1, dataMatrix2) {
    if (dataMatrix1.departInfo.nRank !== dataMatrix2.departInfo.nRank) {
        throw new Error('can not mul the  matrixs');
    }
    var ArrayTemp = [];
    // 这里得注意下是否越界，并且起始点不是0，0 而是偏移地址切记；
    if (dataMatrix1.departInfo.nRank === 1) {
        var rowAPading = dataMatrix1.departInfo.rowPading;
        var colAPading = dataMatrix1.departInfo.colPading;
        var rowBPading = dataMatrix2.departInfo.rowPading;
        var colBPading = dataMatrix2.departInfo.colPading;
        var subArray = [];
        var Aij = 0;
        var Bij = 0;
        if (rowAPading < dataMatrix1.dataMatrix.row && colAPading < dataMatrix1.dataMatrix.col) {
            Aij = dataMatrix1.dataMatrix.dataMatrix[rowAPading][colAPading];
        }
        if (rowBPading < dataMatrix2.dataMatrix.row && colBPading < dataMatrix2.dataMatrix.col) {
            Bij = dataMatrix2.dataMatrix.dataMatrix[rowBPading][colBPading];
        }
        subArray.push(Aij * Bij);
        ArrayTemp.push(subArray);
        return {
            row: 1,
            col: 1,
            dataMatrix: ArrayTemp
        };
    }
    else {
        // 判断是否奇数，如果是奇数右和下补齐一列成偶数行列
        var nRankParent = dataMatrix1.departInfo.nRank;
        var nSubMatrixRank = 0;
        if (nRankParent % 2 === 0) {
            nSubMatrixRank = nRankParent / 2;
        }
        else {
            nSubMatrixRank = (nRankParent + 1) / 2;
        }
        // 划分矩阵
        var A11 = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading,
                colPading: dataMatrix1.departInfo.colPading,
            }
        };
        var A12 = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading,
                colPading: dataMatrix1.departInfo.colPading + nSubMatrixRank,
            }
        };
        var A21 = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix1.departInfo.colPading,
            }
        };
        var A22 = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix1.departInfo.colPading + nSubMatrixRank,
            }
        };
        /////////////////划分B//////////////////////////////////////////////
        var B11 = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading,
                colPading: dataMatrix2.departInfo.colPading,
            }
        };
        var B12 = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading,
                colPading: dataMatrix2.departInfo.colPading + nSubMatrixRank,
            }
        };
        var B21 = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix2.departInfo.colPading,
            }
        };
        var B22 = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix2.departInfo.colPading + nSubMatrixRank,
            }
        };
        //计算S1 -S10
        //s1= b12 - b22
        var S1 = subMatrixHelpCommon(B12, B22);
        //s2 = a11 + a12
        var S2 = addMatrixHelpCommon(A11, A12);
        //s3 = a21 + a22
        var S3 = addMatrixHelpCommon(A21, A22);
        //s4 = b21 - b11
        var S4 = subMatrixHelpCommon(B21, B11);
        //s5 = a11 + a22
        var S5 = addMatrixHelpCommon(A11, A22);
        //s6 = b11 + b22
        var S6 = addMatrixHelpCommon(B11, B22);
        //s7 = a12 - a22
        var S7 = subMatrixHelpCommon(A12, A22);
        //s8 = b21 + b22
        var S8 = addMatrixHelpCommon(B21, B22);
        //s9 = a11 - a21
        var S9 = subMatrixHelpCommon(A11, A21);
        //s10 = b11 + b12
        var S10 = addMatrixHelpCommon(B11, B12);
        ///////////////////////////////
        // p1 = a11*s1
        var P1 = mulMatrixStrassenHelpCommon(A11, S1);
        // printMatrix(P1);
        // p2 = s2*b22
        var P2 = mulMatrixStrassenHelpCommon(S2, B22);
        // printMatrix(P2);
        // p3 = s3 * b11
        var P3 = mulMatrixStrassenHelpCommon(S3, B11);
        // printMatrix(P3);
        // p4 = a22* s4
        var P4 = mulMatrixStrassenHelpCommon(A22, S4);
        // printMatrix(P4);
        // p5 = s5 * s6
        var P5 = mulMatrixStrassenHelpCommon(S5, S6);
        // printMatrix(P5);
        // p6 = s7 * s8
        var P6 = mulMatrixStrassenHelpCommon(S7, S8);
        // printMatrix(P6);
        // p7 = s9 * s10
        var P7 = mulMatrixStrassenHelpCommon(S9, S10);
        // printMatrix(P7);
        ////////////////////////////////////
        var ArrayTemp_2 = [];
        for (var i = 0; i < dataMatrix1.departInfo.nRank; ++i) {
            var arrayRowItem = [];
            for (var j = 0; j < dataMatrix1.departInfo.nRank; ++j) {
                if (i < nSubMatrixRank && j < nSubMatrixRank) {
                    var Temp = P5.dataMatrix[i][j] + P4.dataMatrix[i][j] - P2.dataMatrix[i][j] + P6.dataMatrix[i][j];
                    arrayRowItem.push(Temp);
                    //c11 = p5 + p4 -p2 + p6
                }
                else if (i < nSubMatrixRank && j >= nSubMatrixRank) {
                    //c12 = p1 + p2
                    var t = j - nSubMatrixRank;
                    var Temp = P1.dataMatrix[i][t] + P2.dataMatrix[i][t];
                    arrayRowItem.push(Temp);
                }
                else if (i >= nSubMatrixRank && j < nSubMatrixRank) {
                    //c21 = p3 + p4
                    var k = i - nSubMatrixRank;
                    var Temp = P3.dataMatrix[k][j] + P4.dataMatrix[k][j];
                    arrayRowItem.push(Temp);
                }
                else {
                    //c22 = p5 + p1 - p3 - p7
                    var k = i - nSubMatrixRank;
                    var t = j - nSubMatrixRank;
                    var Temp = P5.dataMatrix[k][t] + P1.dataMatrix[k][t] - P3.dataMatrix[k][t] - P7.dataMatrix[k][t];
                    arrayRowItem.push(Temp);
                }
            }
            ArrayTemp_2.push(arrayRowItem);
        }
        return {
            row: dataMatrix1.departInfo.nRank,
            col: dataMatrix1.departInfo.nRank,
            dataMatrix: ArrayTemp_2
        };
    }
}
// const ArrayTemp1 = [[5,2],[9,3]];
// const ArrayTemp2 = [[8,2],[2,8]];
var temp1 = generateRandomMatrix(7, 7);
//{dataMatrix:ArrayTemp1,row:2,col:2};
printMatrix(temp1);
console.log('--------------------');
var temp2 = generateRandomMatrix(7, 7);
printMatrix(temp2);
console.log('fffffffffffffffffff');
var temp3 = mulMatrixBrute(temp1, temp2);
printMatrix(temp3);
var temp4 = mulMatrixStrassen2(temp1, temp2);
printMatrix(temp4);
