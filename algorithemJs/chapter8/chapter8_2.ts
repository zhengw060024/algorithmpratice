import utilityTools from './utilitytools';
/**
 * 桶排序
 * @param arrayInput 输入
 * @param nRangeMin 桶排序下限
 * @param nRangMax 桶排序上限,注意不包含nRangeMax
 */
function bucketSort(arrayInput: Array<number>, nRangeMin: number, nRangMax: number) {
    let nRange = nRangMax - nRangeMin;
    let nNum = arrayInput.length;
    const arrayHelp: Array<Array<number>> = [];
    // let nRangeDeaprt = nRange / nNum;
    for (let i = 0; i < arrayInput.length; ++i) {
        let nIndex = Math.floor((arrayInput[i] - nRangeMin) * nNum / nRange);
        if (!arrayHelp[nIndex]) {
            arrayHelp[nIndex] = [];
        }
        arrayHelp[nIndex].push(arrayInput[i]);
    }
    for (let i = 0; i < arrayHelp.length; ++i) {
        if (arrayHelp[i]) {
            arrayHelp[i].sort((a: number, b: number) => {
                return a - b;
            });
        } else {

        }
    }
    const arrayTemp = [];
    // console.log(arrayHelp);
    for (let i = 0; i < arrayHelp.length; ++i) {
        if (arrayHelp[i]) {
            arrayHelp[i].forEach((data) => {
                arrayTemp.push(data);
            });
        }

    }
    return arrayTemp;
}

// 算法导论圆周点排序，桶分割id 为 (x*x  + y * y)/n
interface PointIntOne {
    x: number;
    y: number;
}
function bucketSortRing(arrayInput: Array<PointIntOne>) {
    let nNum = arrayInput.length;
    const nRange = 1.0 / nNum;
    const arrayTemp: Array<Array<PointIntOne>> = [];
    for (let i = 0; i < arrayInput.length; ++i) {
        let nIndex = Math.floor(nNum * (arrayInput[i].x * arrayInput[i].x +
            arrayInput[i].y * arrayInput[i].y));
        if (!arrayTemp[nIndex]) {
            arrayTemp[nIndex] = [];
        }
        arrayTemp[nIndex].push(arrayInput[i]);
    }
    for (let i = 0; i < arrayTemp.length; ++i) {
        if (arrayTemp[i]) {
            arrayTemp[i].sort((data: PointIntOne, data2: PointIntOne) => {
                return data.x * data.x + data.y * data.y - (data2.x * data2.x + data2.y * data2.y);
            });
        }
    }
    const arrayOut: Array<PointIntOne> = [];
    for (let i = 0; i < arrayTemp.length; ++i) {
        if (arrayTemp[i]) {
            arrayTemp[i].forEach(item => {
                arrayOut.push(item);
            });
        }
    }
    return arrayOut;
}
// 习题8-4-5：
// 思路如下：假设概率分布函数为p(x),则概率分布函数一定是取值范围[0,1]且递增的
// 如果待排序数组有n个，将[0,1]分割成n个区间，通过待排序的数值x[i]计算p(x[i]),
// 然后根据p(x[i])的值划归x[i]所属的区间（ 利用单调递增性,保证排序有效性）
// 这个代码的测试程序不太好编写，主要是不好生成随机变量。
// 备注：一般的方法是先产生[0,1]均匀分布随机数,
// 然后利用分布函数的反函数求对应的随机数.离散情形和连续情形有所不同。 
// 例如指数分布F(X)=1-EXP(-aX),反函数为S(U)=-(1/a)ln(1-u),先产生[0,1]均匀分布随机数u，
// 带入S(u），得到指数分布随机数。
/**
 * 此处是我模拟的一个概率分布函数
 * @param x 
 */
function getPx(x:number) {
    return 1 - Math.exp(0.5 * x);
}
function getEx(nNum:number) {
    let arrayOut = [];
    for(let i = 0; i < nNum; ++i) {
        let nRandom = Math.random();
        // S(U)=-(1/a)ln(1-u)
        let temp = 2 * Math.log(1 - nRandom);
        arrayOut.push(temp);
    }
    return arrayOut;
}
function bucketSortP(arrayInput: Array<number>, nRangeMin: number, nRangMax: number) {
    let nNum = arrayInput.length;
    const nRange = 1.0 / nNum;
    const arrayTemp: Array<Array<number>> = [];
    for (let i = 0; i < arrayInput.length; ++i) {
        let nIndex = Math.floor(nNum * getPx(arrayInput[i]));
        if (!arrayTemp[nIndex]) {
            arrayTemp[nIndex] = [];
        }
        arrayTemp[nIndex].push(arrayInput[i]);
    }
    for (let i = 0; i < arrayTemp.length; ++i) {
        if (arrayTemp[i]) {
            arrayTemp[i].sort((data: number, data2: number) => {
                return data - data2;
            });
        }
    }
    const arrayOut: Array<number> = [];
    for (let i = 0; i < arrayTemp.length; ++i) {
        if (arrayTemp[i]) {
            arrayTemp[i].forEach(item => {
                arrayOut.push(item);
            });
        }
    }
    return arrayOut;
}
function testCaseRanGenerate() {
    // 生成10000个随机数，然后看下按照桶的划分其分布是否均匀。
    
    let arrayInput  = getEx(10000);
    // console.log(`${arrayInput}`);
    let nNum = 10;
    const nRange = 1.0 / nNum;
    const arrayTemp: Array<Array<number>> = [];
    for (let i = 0; i < arrayInput.length; ++i) {
        let nIndex = Math.floor(nNum * getPx(arrayInput[i]));
        // console.log(nIndex);
        if (!arrayTemp[nIndex]) {
            arrayTemp[nIndex] = [];
        }
        arrayTemp[nIndex].push(arrayInput[i]);
    }
    console.log('fdsaf');
    for(let i = 0; i< arrayTemp.length; ++i) {
        console.log(arrayTemp[i].length);
    }
}
class BucketSortCase {
    constructor() {

    }
    testCaseBucketSort() {
        const arrayTest = utilityTools.generateRandomArray(1, 10000, 100);
        const arraySorted = bucketSort(arrayTest.concat(), 1, 10000 + 1);
        console.log(`${arraySorted}`);
        this.checkSortRight(arraySorted, arrayTest);
    }
    testCaseBuckSort2() {
        const nNum = utilityTools.generateRandom(5,200);
        const arrayTemp = this.generateArrayRingTest(nNum);
        console.log(arrayTemp);
        const arraySorted = bucketSortRing(arrayTemp);
        console.log(arraySorted);
        this.checkSortRight2(arraySorted, arrayTemp);
    }

    private checkSortRight2(arraySorted: Array<PointIntOne>, arrayOgin: Array<PointIntOne>) {
        const arrayToCheck = arrayOgin.concat().sort((a: PointIntOne, b: PointIntOne) => {
            return a.x * a.x + a.y * a.y - (b.x * b.x + b.y * b.y);
        });
        if (arraySorted.length !== arrayToCheck.length) {
            console.log('array sorted num is not right!');
            return false;
        }
        for (let i = 0; i < arraySorted.length; ++i) {
            if (arraySorted[i] !== arrayToCheck[i]) {
                // 注意这里添加一个判断，防止振幅一致！！！
                if (arraySorted[i].x * arraySorted[i].x + arraySorted[i].y * arraySorted[i].y ===
                    arrayToCheck[i].x * arrayToCheck[i].x + arrayToCheck[i].y * arrayToCheck[i].y) {
                    continue;
                }
                console.log('array sorted error!!!');
                return false;
            }
        }
        console.log('array sort right!');
        return true;
    }
    private checkSortRight(arraySorted: Array<number>, arrayOgin: Array<number>) {
        const arrayToCheck = arrayOgin.concat().sort((a: number, b: number) => {
            return a - b;
        });
        if (arraySorted.length !== arrayToCheck.length) {
            console.log('array sorted num is not right!');
            return false;
        }
        for (let i = 0; i < arraySorted.length; ++i) {
            if (arraySorted[i] !== arrayToCheck[i]) {

                console.log('array sorted error!!!');
                return false;
            }
        }
        console.log('array sort right!');
        return true;
    }
    /**
     * 如何生成测试序列还是值得思考一下的，
     * 我是这样生成的，用幅度和角度做参数，其中
     * 幅度范围为(0,1),角度范围为(0,2*Pi)
     */
    private generateArrayRingTest(nNum: number) {
        const arrayOut: Array<PointIntOne> = [];
        for (let i = 0; i < nNum; ++i) {
            let nSwing = Math.random();
            let nAngle = Math.random() * 2 * Math.PI;
            arrayOut.push({
                x: nSwing * Math.cos(nAngle),
                y: nSwing * Math.sin(nAngle)
            });
        }
        return arrayOut;
    }
}

const Temp = new BucketSortCase();
Temp.testCaseBucketSort();
Temp.testCaseBuckSort2();
testCaseRanGenerate();