import utilityTools from './utilitytools'
// 矩阵乘法的 strassen算法 算法导论4-2
// 标准矩阵算法
interface Matrix {
    row: number;
    col: number;
    dataMatrix: Array<Array<number>>;
}
function generateRandomMatrix(row: number, col: number): Matrix {
    const dataMatrix = [];

    for (let i = 0; i < row; ++i) {
        let tempArray = [];
        for (let j = 0; j < col; ++j) {
            tempArray.push(utilityTools.generateRandom(0, 9));
        }
        dataMatrix.push(tempArray);
    }
    return {
        row: row,
        col: col,
        dataMatrix: dataMatrix
    }

}


function printMatrix(dataMatrix: Matrix) {
    console.log('output begin');
    for (let i = 0; i < dataMatrix.dataMatrix.length; ++i) {
        let temp = dataMatrix.dataMatrix[i];
        console.log(`${temp}`);
    }
    console.log('output complete');
}
function addMatrix(data1: Matrix, data2: Matrix): Matrix {
    if (data1.col !== data2.col || data2.row !== data1.row) {
        throw new Error('error ! the two matrix is not the same row and line!');
    }
    const dataMatrix: Array<Array<number>> = [];
    for (let i = 0; i < data1.row; ++i) {
        // const tempArray1 = data1.dataMatrix[i];
        // const tempArray2 = data2.dataMatrix[i]
        const TempArray = [];
        for (let j = 0; j < data1.col; ++j) {
            const temp = data1.dataMatrix[i][j] + data2.dataMatrix[i][j];
            TempArray.push(temp);
        }
        dataMatrix.push(TempArray);
    }
    return {
        row: data1.row,
        col: data1.col,
        dataMatrix: dataMatrix
    }
}
function subMatrix(data1: Matrix, data2: Matrix): Matrix {
    if (data1.col !== data2.col || data2.row !== data1.row) {
        throw new Error('error ! the two matrix is not the same row and line!');
    }
    const dataMatrix: Array<Array<number>> = [];
    for (let i = 0; i < data1.row; ++i) {
        // const tempArray1 = data1.dataMatrix[i];
        // const tempArray2 = data2.dataMatrix[i]
        const TempArray = [];
        for (let j = 0; j < data1.col; ++j) {
            const temp = data1.dataMatrix[i][j] - data2.dataMatrix[i][j];
            TempArray.push(temp);
        }
        dataMatrix.push(TempArray);
    }
    return {
        row: data1.row,
        col: data1.col,
        dataMatrix: dataMatrix
    }
}
function mulMatrixBrute(data1: Matrix, data2: Matrix): Matrix {
    if (data1.col !== data2.row) {
        throw new Error('error! illegal operate!');
    }
    const dataMatrix: Array<Array<number>> = [];
    for (let i = 0; i < data1.row; ++i) {
        const TempArray = [];
        for (let j = 0; j < data2.col; ++j) {
            let Temp = 0;
            for (let k = 0; k < data1.col; ++k) {
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
    }
}
interface DepartHelp {
    nRank: number;
    rowPading: number;
    colPading: number;
}
interface SubMatrix {
    dataMatrix: Matrix;
    departInfo: DepartHelp;
}
/**
 * 确保两个相乘的矩阵的秩为2的k次方
 * @param dataMatrix1 
 * @param dataMatrix2 
 */
function mulMatrixStrassen1(dataMatrix1: Matrix, dataMatrix2: Matrix): Matrix {
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
function subMatrixHelp(dataMatrix1: SubMatrix, dataMatrix2: SubMatrix): SubMatrix {
    const dataMatrix: Array<Array<number>> = [];
    const padingArow = dataMatrix1.departInfo.rowPading;
    const padingAcol = dataMatrix1.departInfo.colPading;

    const padingBrow = dataMatrix2.departInfo.rowPading;
    const padingBcol = dataMatrix2.departInfo.colPading;

    for (let i = 0; i < dataMatrix1.departInfo.nRank; ++i) {
        // const tempArray1 = data1.dataMatrix[i];
        // const tempArray2 = data2.dataMatrix[i]
        const TempArray = [];
        for (let j = 0; j < dataMatrix1.departInfo.nRank; ++j) {
            const temp = dataMatrix1.dataMatrix.dataMatrix[i + padingArow][j + padingAcol] - dataMatrix2.dataMatrix.dataMatrix[i + padingBrow][j + padingBcol];
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
    }

}
function addMatrixHelp(dataMatrix1: SubMatrix, dataMatrix2: SubMatrix): SubMatrix {
    const dataMatrix: Array<Array<number>> = [];
    const padingArow = dataMatrix1.departInfo.rowPading;
    const padingAcol = dataMatrix1.departInfo.colPading;

    const padingBrow = dataMatrix2.departInfo.rowPading;
    const padingBcol = dataMatrix2.departInfo.colPading;

    for (let i = 0; i < dataMatrix1.departInfo.nRank; ++i) {
        // const tempArray1 = data1.dataMatrix[i];
        // const tempArray2 = data2.dataMatrix[i]
        const TempArray = [];
        for (let j = 0; j < dataMatrix1.departInfo.nRank; ++j) {
            const temp = dataMatrix1.dataMatrix.dataMatrix[i + padingArow][j + padingAcol] + dataMatrix2.dataMatrix.dataMatrix[i + padingBrow][j + padingBcol];
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
    }
}
function mulMatrixStrassenHelp(dataMatrix1: SubMatrix, dataMatrix2: SubMatrix): Matrix {
    if (dataMatrix1.departInfo.nRank !== dataMatrix2.departInfo.nRank) {
        throw new Error('can not mul the  matrixs');
    }

    const ArrayTemp = [];
     // 记住起始点不是0,0 而是偏移地址，因为这个计算的矩阵实质上并没有被创建，只是用索引分割
    if (dataMatrix1.departInfo.nRank === 1) {
        const rowAPading = dataMatrix1.departInfo.rowPading;
        const colAPading = dataMatrix1.departInfo.colPading;
        const rowBPading = dataMatrix2.departInfo.rowPading;
        const colBPading = dataMatrix2.departInfo.colPading;
        const subArray = [];
        subArray.push((dataMatrix1.dataMatrix.dataMatrix)[rowAPading][colAPading] * (dataMatrix2.dataMatrix.dataMatrix)[rowBPading][colBPading]);
        ArrayTemp.push(subArray);
        return {
            row: 1,
            col: 1,
            dataMatrix: ArrayTemp
        }
    } else {
        // 划分矩阵
        const nSubMatrixRank = dataMatrix1.departInfo.nRank / 2;
        const A11: SubMatrix = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading,
                colPading: dataMatrix1.departInfo.colPading,
            }
        };
        const A12: SubMatrix = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading,
                colPading: dataMatrix1.departInfo.colPading + nSubMatrixRank,
            }
        };
        const A21: SubMatrix = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix1.departInfo.colPading,
            }
        };
        const A22: SubMatrix = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix1.departInfo.colPading + nSubMatrixRank,
            }
        };
        /////////////////划分B//////////////////////////////////////////////
        const B11: SubMatrix = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading,
                colPading: dataMatrix2.departInfo.colPading,
            }
        };
        const B12: SubMatrix = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading,
                colPading: dataMatrix2.departInfo.colPading + nSubMatrixRank,
            }
        };
        const B21: SubMatrix = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix2.departInfo.colPading,
            }
        };
        const B22: SubMatrix = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix2.departInfo.colPading + nSubMatrixRank,
            }
        };
        //计算S1 -S10
        //s1= b12 - b22
        const S1 = subMatrixHelp(B12, B22);
        //s2 = a11 + a12
        const S2 = addMatrixHelp(A11, A12);
        //s3 = a21 + a22
        const S3 = addMatrixHelp(A21, A22);
        //s4 = b21 - b11
        const S4 = subMatrixHelp(B21, B11);
        //s5 = a11 + a22
        const S5 = addMatrixHelp(A11, A22);
        //s6 = b11 + b22
        const S6 = addMatrixHelp(B11, B22);
        //s7 = a12 - a22
        const S7 = subMatrixHelp(A12, A22);
        //s8 = b21 + b22
        const S8 = addMatrixHelp(B21, B22);
        //s9 = a11 - a21
        const S9 = subMatrixHelp(A11, A21);
        //s10 = b11 + b12
        const S10 = addMatrixHelp(B11, B12);

        ///////////////////////////////
        // p1 = a11*s1
        const P1 = mulMatrixStrassenHelp(A11, S1);
        // printMatrix(P1);
        // p2 = s2*b22
        const P2 = mulMatrixStrassenHelp(S2, B22);
        // printMatrix(P2);
        // p3 = s3 * b11
        const P3 = mulMatrixStrassenHelp(S3, B11);
        // printMatrix(P3);
        // p4 = a22* s4
        const P4 = mulMatrixStrassenHelp(A22, S4);
        // printMatrix(P4);
        // p5 = s5 * s6
        const P5 = mulMatrixStrassenHelp(S5, S6);
        // printMatrix(P5);
        // p6 = s7 * s8
        const P6 = mulMatrixStrassenHelp(S7, S8);
        // printMatrix(P6);
        // p7 = s9 * s10
        const P7 = mulMatrixStrassenHelp(S9, S10);
        // printMatrix(P7);

        ////////////////////////////////////
        const ArrayTemp = [];
        for (let i = 0; i < dataMatrix1.departInfo.nRank; ++i) {
            const arrayRowItem = [];
            for (let j = 0; j < dataMatrix1.departInfo.nRank; ++j) {

                if (i < nSubMatrixRank && j < nSubMatrixRank) {
                    const Temp: number = P5.dataMatrix[i][j] + P4.dataMatrix[i][j] - P2.dataMatrix[i][j] + P6.dataMatrix[i][j];
                    arrayRowItem.push(Temp);
                    //c11 = p5 + p4 -p2 + p6

                } else if (i < nSubMatrixRank && j >= nSubMatrixRank) {
                    //c12 = p1 + p2
                    let t = j - nSubMatrixRank;
                    const Temp: number = P1.dataMatrix[i][t] + P2.dataMatrix[i][t];
                    arrayRowItem.push(Temp);
                } else if (i >= nSubMatrixRank && j < nSubMatrixRank) {
                    //c21 = p3 + p4
                    let k = i - nSubMatrixRank;
                    const Temp: number = P3.dataMatrix[k][j] + P4.dataMatrix[k][j];
                    arrayRowItem.push(Temp);

                } else {
                    //c22 = p5 + p1 - p3 - p7
                    let k = i - nSubMatrixRank;
                    let t = j - nSubMatrixRank;
                    const Temp: number = P5.dataMatrix[k][t] + P1.dataMatrix[k][t] - P3.dataMatrix[k][t] - P7.dataMatrix[k][t];
                    arrayRowItem.push(Temp);
                }
            }
            ArrayTemp.push(arrayRowItem);
        }
        return {
            row: dataMatrix1.departInfo.nRank,
            col: dataMatrix1.departInfo.nRank,
            dataMatrix: ArrayTemp
        }
    }
}
/////////处理非2的k次方的情况//////////////////////
/**
 * 不需要矩阵的秩为2的k次方
 * @param dataMatrix1 
 * @param dataMatrix2 
 */
function mulMatrixStrassen2(dataMatrix1: Matrix, dataMatrix2: Matrix): Matrix {
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
function subMatrixHelpCommon(dataMatrix1: SubMatrix, dataMatrix2: SubMatrix): SubMatrix {
    const dataMatrix: Array<Array<number>> = [];
    const padingArow = dataMatrix1.departInfo.rowPading;
    const padingAcol = dataMatrix1.departInfo.colPading;

    const padingBrow = dataMatrix2.departInfo.rowPading;
    const padingBcol = dataMatrix2.departInfo.colPading;

    for (let i = 0; i < dataMatrix1.departInfo.nRank; ++i) {
        // const tempArray1 = data1.dataMatrix[i];
        // const tempArray2 = data2.dataMatrix[i]
        const TempArray = [];
        for (let j = 0; j < dataMatrix1.departInfo.nRank; ++j) {
            // 这里做个判断，如果读取越界了，就直接置 0；
            let Aij = 0;
            let Bij = 0;
            if (i + padingArow < dataMatrix1.dataMatrix.row && j + padingAcol < dataMatrix1.dataMatrix.col) {
                Aij = dataMatrix1.dataMatrix.dataMatrix[i + padingArow][j + padingAcol];
            }
            if (i + padingBrow < dataMatrix2.dataMatrix.row && j + padingBcol < dataMatrix2.dataMatrix.col) {
                Bij = dataMatrix2.dataMatrix.dataMatrix[i + padingBrow][j + padingBcol];;
            }
            const temp = Aij - Bij;
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
    }

}
function addMatrixHelpCommon(dataMatrix1: SubMatrix, dataMatrix2: SubMatrix): SubMatrix {
    const dataMatrix: Array<Array<number>> = [];
    const padingArow = dataMatrix1.departInfo.rowPading;
    const padingAcol = dataMatrix1.departInfo.colPading;

    const padingBrow = dataMatrix2.departInfo.rowPading;
    const padingBcol = dataMatrix2.departInfo.colPading;

    for (let i = 0; i < dataMatrix1.departInfo.nRank; ++i) {
        // const tempArray1 = data1.dataMatrix[i];
        // const tempArray2 = data2.dataMatrix[i]
        const TempArray = [];
        for (let j = 0; j < dataMatrix1.departInfo.nRank; ++j) {
            let Aij = 0;
            let Bij = 0;
            if (i + padingArow < dataMatrix1.dataMatrix.row && j + padingAcol < dataMatrix1.dataMatrix.col) {
                Aij = dataMatrix1.dataMatrix.dataMatrix[i + padingArow][j + padingAcol];
            }
            if (i + padingBrow < dataMatrix2.dataMatrix.row && j + padingBcol < dataMatrix2.dataMatrix.col) {
                Bij = dataMatrix2.dataMatrix.dataMatrix[i + padingBrow][j + padingBcol];;
            }
            const temp = Aij + Bij;
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
    }
}
function mulMatrixStrassenHelpCommon(dataMatrix1: SubMatrix, dataMatrix2: SubMatrix): Matrix {
    if (dataMatrix1.departInfo.nRank !== dataMatrix2.departInfo.nRank) {
        throw new Error('can not mul the  matrixs');
    }

    const ArrayTemp = [];
    // 这里得注意下是否越界，并且起始点不是0，0 而是偏移地址切记；
    if (dataMatrix1.departInfo.nRank === 1) {
        const rowAPading = dataMatrix1.departInfo.rowPading;
        const colAPading = dataMatrix1.departInfo.colPading;
        const rowBPading = dataMatrix2.departInfo.rowPading;
        const colBPading = dataMatrix2.departInfo.colPading;
        const subArray = [];
        let Aij = 0;
        let Bij = 0;
        if(rowAPading < dataMatrix1.dataMatrix.row && colAPading < dataMatrix1.dataMatrix.col) {
            Aij = dataMatrix1.dataMatrix.dataMatrix[rowAPading][colAPading] ;
        }
        if(rowBPading < dataMatrix2.dataMatrix.row && colBPading < dataMatrix2.dataMatrix.col) {
            Bij = dataMatrix2.dataMatrix.dataMatrix[rowBPading][colBPading]
        }
        subArray.push(Aij * Bij);
        ArrayTemp.push(subArray);
        return {
            row: 1,
            col: 1,
            dataMatrix: ArrayTemp
        }
    } else {
        // 判断是否奇数，如果是奇数右和下补齐一列成偶数行列
        const nRankParent = dataMatrix1.departInfo.nRank;
        let nSubMatrixRank = 0;
        if (nRankParent % 2 === 0) {
            nSubMatrixRank = nRankParent / 2;
        } else {
            nSubMatrixRank = (nRankParent + 1) / 2;
        }
        // 划分矩阵
        const A11: SubMatrix = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading,
                colPading: dataMatrix1.departInfo.colPading,
            }
        };
        const A12: SubMatrix = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading,
                colPading: dataMatrix1.departInfo.colPading + nSubMatrixRank,
            }
        };
        const A21: SubMatrix = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix1.departInfo.colPading,
            }
        };
        const A22: SubMatrix = {
            dataMatrix: dataMatrix1.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix1.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix1.departInfo.colPading + nSubMatrixRank,
            }
        };
        /////////////////划分B//////////////////////////////////////////////
        const B11: SubMatrix = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading,
                colPading: dataMatrix2.departInfo.colPading,
            }
        };
        const B12: SubMatrix = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading,
                colPading: dataMatrix2.departInfo.colPading + nSubMatrixRank,
            }
        };
        const B21: SubMatrix = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix2.departInfo.colPading,
            }
        };
        const B22: SubMatrix = {
            dataMatrix: dataMatrix2.dataMatrix,
            departInfo: {
                nRank: nSubMatrixRank,
                rowPading: dataMatrix2.departInfo.rowPading + nSubMatrixRank,
                colPading: dataMatrix2.departInfo.colPading + nSubMatrixRank,
            }
        };
        //计算S1 -S10
        //s1= b12 - b22
        const S1 = subMatrixHelpCommon(B12, B22);
        //s2 = a11 + a12
        const S2 = addMatrixHelpCommon(A11, A12);
        //s3 = a21 + a22
        const S3 = addMatrixHelpCommon(A21, A22);
        //s4 = b21 - b11
        const S4 = subMatrixHelpCommon(B21, B11);
        //s5 = a11 + a22
        const S5 = addMatrixHelpCommon(A11, A22);
        //s6 = b11 + b22
        const S6 = addMatrixHelpCommon(B11, B22);
        //s7 = a12 - a22
        const S7 = subMatrixHelpCommon(A12, A22);
        //s8 = b21 + b22
        const S8 = addMatrixHelpCommon(B21, B22);
        //s9 = a11 - a21
        const S9 = subMatrixHelpCommon(A11, A21);
        //s10 = b11 + b12
        const S10 = addMatrixHelpCommon(B11, B12);

        ///////////////////////////////
        // p1 = a11*s1
        const P1 = mulMatrixStrassenHelpCommon(A11, S1);
        // printMatrix(P1);
        // p2 = s2*b22
        const P2 = mulMatrixStrassenHelpCommon(S2, B22);
        // printMatrix(P2);
        // p3 = s3 * b11
        const P3 = mulMatrixStrassenHelpCommon(S3, B11);
        // printMatrix(P3);
        // p4 = a22* s4
        const P4 = mulMatrixStrassenHelpCommon(A22, S4);
        // printMatrix(P4);
        // p5 = s5 * s6
        const P5 = mulMatrixStrassenHelpCommon(S5, S6);
        // printMatrix(P5);
        // p6 = s7 * s8
        const P6 = mulMatrixStrassenHelpCommon(S7, S8);
        // printMatrix(P6);
        // p7 = s9 * s10
        const P7 = mulMatrixStrassenHelpCommon(S9, S10);
        // printMatrix(P7);

        ////////////////////////////////////
        const ArrayTemp = [];
        for (let i = 0; i < dataMatrix1.departInfo.nRank; ++i) {
            const arrayRowItem = [];
            for (let j = 0; j < dataMatrix1.departInfo.nRank; ++j) {

                if (i < nSubMatrixRank && j < nSubMatrixRank) {
                    const Temp: number = P5.dataMatrix[i][j] + P4.dataMatrix[i][j] - P2.dataMatrix[i][j] + P6.dataMatrix[i][j];
                    arrayRowItem.push(Temp);
                    //c11 = p5 + p4 -p2 + p6

                } else if (i < nSubMatrixRank && j >= nSubMatrixRank) {
                    //c12 = p1 + p2
                    let t = j - nSubMatrixRank;
                    const Temp: number = P1.dataMatrix[i][t] + P2.dataMatrix[i][t];
                    arrayRowItem.push(Temp);
                } else if (i >= nSubMatrixRank && j < nSubMatrixRank) {
                    //c21 = p3 + p4
                    let k = i - nSubMatrixRank;
                    const Temp: number = P3.dataMatrix[k][j] + P4.dataMatrix[k][j];
                    arrayRowItem.push(Temp);

                } else {
                    //c22 = p5 + p1 - p3 - p7
                    let k = i - nSubMatrixRank;
                    let t = j - nSubMatrixRank;
                    const Temp: number = P5.dataMatrix[k][t] + P1.dataMatrix[k][t] - P3.dataMatrix[k][t] - P7.dataMatrix[k][t];
                    arrayRowItem.push(Temp);
                }
            }
            ArrayTemp.push(arrayRowItem);
        }
        return {
            row: dataMatrix1.departInfo.nRank,
            col: dataMatrix1.departInfo.nRank,
            dataMatrix: ArrayTemp
        }
    }
}
// const ArrayTemp1 = [[5,2],[9,3]];
// const ArrayTemp2 = [[8,2],[2,8]];
const temp1: Matrix = generateRandomMatrix(7, 7);
//{dataMatrix:ArrayTemp1,row:2,col:2};
printMatrix(temp1);
console.log('--------------------');
const temp2 = generateRandomMatrix(7, 7);
printMatrix(temp2);
console.log('fffffffffffffffffff');

const temp3 = mulMatrixBrute(temp1, temp2);

printMatrix(temp3);
const temp4 = mulMatrixStrassen2(temp1, temp2);
printMatrix(temp4);

