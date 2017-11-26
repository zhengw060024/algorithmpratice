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
function mulMatrixBrute(data1: Matrix, data2: Matrix): Matrix {
    if (data1.col!== data2.row) {
        throw new Error('error! illegal operate!');
    }
    const dataMatrix: Array<Array<number>> = [];
    for(let i = 0; i < data1.row; ++i) {
        const TempArray = [];
        for(let j = 0; j < data2.col; ++j) {
            let Temp = 0;
            for(let k = 0; k < data1.col; ++k) {
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
const temp1 = generateRandomMatrix(4, 6);
printMatrix(temp1);
console.log('--------------------');
const temp2 = generateRandomMatrix(4, 6);
printMatrix(temp2);
console.log('fffffffffffffffffff');
const temp3 = addMatrix(temp1, temp2);
printMatrix(temp3);
const Temp4 = generateRandomMatrix(6,4);
printMatrix(Temp4);
const Temp5 = mulMatrixBrute(temp1,Temp4);
printMatrix(Temp5);

