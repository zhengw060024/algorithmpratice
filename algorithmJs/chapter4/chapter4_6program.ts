//算法导论第四章思考题6 Monge矩阵
// Monge矩阵：对任意1 <=i < k <= m和 1 <=j <l <=n
// 有 A[i,j] + A[k,l] <= A[i,l] + A[k,j];
// 证明Monge矩阵的充要条件是A[i,j] + A[i + 1,j + 1] <= A[i, j+ 1] + A[i+ 1,j];
// 显然必要条件是一定的，令k = i +1,l = j+ 1由其性质可以得出结论。
// 现在证明其充分条件：首先证明：对于l > j,有A[i,j] + A[i +１,l] <= A[i,l] +A[i +1,j];
// 对列进行归纳假设，设l = j + m (m > 0),当m为1时成立，现在对m进行归纳
// 则有有A[i,j] + A[i +１,j+ m] <= A[i,j+m] +A[i +1,j];
// A[i,j+ m] + A[i + 1,j+m + 1] <= A[i,j + m+ 1] + A[i+1,j+ m];
// 将两个等式取和，有A[i,j] + A[i+ 1,j+m+1] < A[i + 1,j] + A[i,j + m+ 1];
// 及对m+ 1成立，有归纳假设得知成立，然后在据此对列进行类似归纳假设，故得证明
// 对c的证明可以使用反证法，注意分析下边界条件。
interface Matrix {
    row: number;
    col: number;
    dataMatrix: Array<Array<number>>;
}
// 递归算法
// 递归算法，为了减少不必要的赋值和拷贝操作，新矩阵直接在原来的矩阵基础上构造
interface MongeSubMatrix {
    arrayRowId: Array<number>;
    dataMatrix: Matrix;
}
function getMongeArrayRowMinRecurWrap(matrixInput: Matrix) {
    const arrayOutput = [];
    const arrayTemp = [];
    for (let i = 0; i < matrixInput.row; ++i) {
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
function getMongeArrayRowMinRecur(subMatrix: MongeSubMatrix, arrayOutPut: Array<number>) {
    if (subMatrix.arrayRowId.length > 1) {
        // 
        const arrayTemp = [];
        for (let i = 1; i < subMatrix.arrayRowId.length;) {
            arrayTemp.push(subMatrix.arrayRowId[i]);
            i = i + 2
        }
        const subsubMatrix = {
            arrayRowId: arrayTemp,
            dataMatrix: subMatrix.dataMatrix
        }
        getMongeArrayRowMinRecur(subsubMatrix, arrayOutPut);
        // console.log(`arrayrowId is ${subMatrix.arrayRowId}`);
        for (let i = 0; i < subMatrix.arrayRowId.length; i = i + 2) {
            const rowId = subMatrix.arrayRowId[i];
            const TempMinArray = subMatrix.dataMatrix.dataMatrix[rowId];
            // console.log(`TempMinArray is ${TempMinArray}`);
            let nStart = 0; let nEnd = subMatrix.dataMatrix.col -1;
            if (i - 1 >= 0) {
                nStart = arrayOutPut[subMatrix.arrayRowId[i - 1]];
            }
            if (i + 1 < subMatrix.arrayRowId.length) {
                nEnd = arrayOutPut[subMatrix.arrayRowId[i + 1]];
            }
            // console.log(`start is end is ${nStart},${nEnd}`);
            let MinLeft = nStart;
            for (let j = nStart; j <= nEnd; ++j) {
                if (TempMinArray[MinLeft] > TempMinArray[j]) {
                    MinLeft = j;
                }
            }
            arrayOutPut[subMatrix.arrayRowId[i]] = MinLeft;
            // console.log(`arrayOutput is ${arrayOutPut},row id is ${subMatrix.arrayRowId[i]},minlef is ${MinLeft}`);
            

        }
    } else {
        let Minleft = 0;
        const nRowId = subMatrix.arrayRowId[0];
        const ArrayTemp = subMatrix.dataMatrix.dataMatrix[nRowId];
        for (let i = 0; i < subMatrix.dataMatrix.col; ++i) {
            if (ArrayTemp[Minleft] > ArrayTemp[i]) {
                Minleft = i;
            }
        }
        arrayOutPut[nRowId] = Minleft;
    }
}
class MongeMatrixTestCase {
    constructor() {
        
    }
    runTest() {
        this.testCase();
    }
    testCase() {
        const arrayTemp = [
            [10, 17, 13, 28, 23],
            [17, 22, 16, 29, 23],
            [24, 28, 22, 34, 24],
            [11, 13, 6, 17, 7],
            [45, 44, 32, 37, 23],
            [36, 33, 19, 21, 6],
            [75, 66, 51, 53, 34]];
        const matrix: Matrix = {
            col:5,
            row:7,
            dataMatrix:arrayTemp
        }
       const Temp =  getMongeArrayRowMinRecurWrap(matrix);
       console.log(`min items is ${Temp}`);
    }
}
const MongeTestCheck = new MongeMatrixTestCase();
export default MongeTestCheck;


