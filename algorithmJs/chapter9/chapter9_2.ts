import utilityTools from './utilitytools';
// import re;
// 期望为线性事件的选择算法。原理，利用快排的划分算法。
/**
 * 从arrayInput的返回[startIndex,endIndex]子数组中
 * 有序(升序)之后，下标为kMax(相对于子数组)数字。
 * @param arrayInput 输入原始序列数组
 * @param startIndex 子数组起始Index
 * @param endIndex 子数组结束Index
 * @param kMax 子数组有序(升序)之后下标为kMax(相对于子数组)的数字
 */
function randomMized_select(arrayInput: Array<number>,
    startIndex: number, endIndex: number, kMin: number): number {
    if (startIndex === endIndex) {
        return arrayInput[startIndex];
    } else {
        let nIndexDepart = randomDepart(arrayInput, startIndex, endIndex);
        let nIndexGet = nIndexDepart - startIndex;
        if (nIndexGet === kMin) {
            return arrayInput[nIndexDepart];
        } else {
            if (nIndexGet > kMin) {
                return randomMized_select(arrayInput, startIndex,nIndexDepart - 1, kMin);
            } else {
                return randomMized_select(arrayInput, nIndexDepart + 1, endIndex, kMin - nIndexGet - 1)
            }
        }
    }

}
/**
 * 分割arrayInput的范围在[startIndex,endIndex]的子数组，然后返回划分枢轴的下标
 * @param arrayInput 输入数组
 * @param startIndex 子数组起始下标
 * @param endIndex 子数组结束下标
 */
function randomDepart(arrayInput: Array<number>,
    startIndex: number, endIndex: number): number {
    let nRandomIndex = utilityTools.generateRandom(startIndex, endIndex);
    // 交换 startIndex 和 nRandomIndex
    if (nRandomIndex !== startIndex) {
        let nTemp = arrayInput[startIndex];
        arrayInput[startIndex] = arrayInput[nRandomIndex];
        arrayInput[nRandomIndex] = nTemp;
    }
    let nDepartNum = arrayInput[startIndex];
    // i 表示枢轴位置。
    // 注意一下变量的作用域，不要将这部分代码写入循环中
    let j = startIndex + 1, i = startIndex;
    for (; j <= endIndex; ++j) {
        if (arrayInput[j] < nDepartNum) {
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = arrayInput[i + 1];
            ++i;
        }
    }
    arrayInput[i] = nDepartNum;
    return i;
}
function randomKMin(arrayInput: Array<number>, kIndex: number) {
    if (kIndex < 1 || kIndex > arrayInput.length) {
        throw new Error('Out of range!!!');
    } else {
        return randomMized_select(arrayInput, 0, arrayInput.length - 1, kIndex - 1);
    }
}
/**
 * 习题9-2.3randmom-select的一个基于循环的版本
 * 这个函数写的好像有点绕，没必要
 * @param arrayInput 
 * @param kIndex 
 */
function randomKMinNocur(arrayInput: Array<number>, kIndex: number){
    if (kIndex < 1 || kIndex > arrayInput.length) {
        throw new Error('Out of range!!!');
    } else {
        let nStartIndex = 0;
        let nEndIndex = arrayInput.length -1;
        let nPosReact = kIndex  -1;
        while(nStartIndex < nEndIndex) {
            let nDepart = randomDepart(arrayInput,nStartIndex,nEndIndex);
            let nDepartReact = nDepart - nStartIndex;
            if(nDepartReact === nPosReact) {
                return arrayInput[nDepart];
            }else if (nDepartReact > nPosReact) {
                nEndIndex = nDepart - 1;
            }else {
                nStartIndex = nDepart + 1;
                nPosReact = nPosReact - nDepartReact - 1;
            }
        }
        return arrayInput[nStartIndex];
    }
}
/**
 * 对上面一个函数坐下修改，没必要像算法导论书上
 * 这么绕，非得求相对pos
 * @param arrayInput 
 * @param nIndex 
 */
function randomKminNoCur2(arrayInput:Array<number>,nIndex:number) {
    if(nIndex < 1|| nIndex > arrayInput.length) {
        throw new Error('Out of range!!!');
    } else {
        let nTruePos = nIndex - 1;
        let nStartIndex = 0;
        let nEndIndex = arrayInput.length -1;
        while(nStartIndex < nEndIndex ) {
            let nDepartpos = randomDepart(arrayInput,nStartIndex,nEndIndex);
            if(nDepartpos < nTruePos) {
                nStartIndex = nDepartpos + 1;
            } else if(nDepartpos > nTruePos) {
                nEndIndex = nDepartpos - 1;
            } else {
                return arrayInput[nDepartpos];
            }
        }
        return arrayInput[nStartIndex];
    }
}
class RandomDepartGetKMinTest {
    constructor() {

    }
    testCase() {
        const arrayInput = utilityTools.generateRandomArray(0, 1000, 40);
        const kIndexNum = utilityTools.generateRandom(1,arrayInput.length);
        console.log(`kIndex is ${kIndexNum}`);
        console.log(`Origin array is ${arrayInput}`);

        let nNumberRandom = randomKMin(arrayInput.concat(),kIndexNum);
        let nTrueNumber = this.getKMinNumBySort(arrayInput.concat(),kIndexNum);
        if(nNumberRandom === nTrueNumber) {
            console.log(`Testcase RandomDepartGetKMinTest success!!! num is ${nNumberRandom}`);
        } else {
            console.log(`Testcase RandomDepartGetKMinTest failed!!!,True number is ${nTrueNumber},but get ${nNumberRandom}`);
        }
    }
    testCaseNoCur() {
        const arrayInput = utilityTools.generateRandomArray(0, 1000, 40);
        const kIndexNum = utilityTools.generateRandom(1,arrayInput.length);
        console.log(`kIndex is ${kIndexNum}`);
        console.log(`Origin array is ${arrayInput}`);

        let nNumberRandom = randomKMinNocur(arrayInput.concat(),kIndexNum);
        let nTrueNumber = this.getKMinNumBySort(arrayInput.concat(),kIndexNum);
        if(nNumberRandom === nTrueNumber) {
            console.log(`Testcase RandomDepartGetKMinTest success!!! num is ${nNumberRandom}`);
        } else {
            console.log(`Testcase RandomDepartGetKMinTest failed!!!,True number is ${nTrueNumber},but get ${nNumberRandom}`);
        }
    }
    testCaseNoCur2() {
        const arrayInput = utilityTools.generateRandomArray(0, 1000, 40);
        const kIndexNum = utilityTools.generateRandom(1,arrayInput.length);
        console.log(`kIndex is ${kIndexNum}`);
        console.log(`Origin array is ${arrayInput}`);

        let nNumberRandom = randomKminNoCur2(arrayInput.concat(),kIndexNum);
        let nTrueNumber = this.getKMinNumBySort(arrayInput.concat(),kIndexNum);
        if(nNumberRandom === nTrueNumber) {
            console.log(`Testcase RandomDepartGetKMinTest2 success!!! num is ${nNumberRandom}`);
        } else {
            console.log(`Testcase RandomDepartGetKMinTest2 failed!!!,True number is ${nTrueNumber},but get ${nNumberRandom}`);
        }
    }
    getKMinNumBySort(arrayInput:Array<number>,kIndex:number) {
        const arrayTemp = arrayInput.concat();
        
        arrayTemp.sort((a,b) => {
            return a- b;
        });
        console.log(`sorted array is ${arrayTemp }`);
        return arrayTemp[kIndex - 1];
    }
}

const testCaseKMinRandom = new RandomDepartGetKMinTest();
testCaseKMinRandom.testCase();
testCaseKMinRandom.testCaseNoCur();
testCaseKMinRandom.testCaseNoCur2();
// let strTemp = "fdsafdsf{fdsafsd}fdsafdsaf"
// let strTemp2 = "fdsafdsf{我是谁}"
// let temp =  RegExp('^(([^\{\}]*)(\{[a-zA-Z]+[_]*[a-zA-Z]+\})*)*$')
// console.log(temp.test(strTemp))
// console.log(temp.test(strTemp2))

// function randomDepart2(arrayInput: Array<number>,
//     startIndex: number, endIndex: number): number {
//     let nRandomIndex = utilityTools.generateRandom(startIndex, endIndex);
//     // 交换 startIndex 和 nRandomIndex
//     if (nRandomIndex !== startIndex) {
//         let nTemp = arrayInput[startIndex];
//         arrayInput[startIndex] = arrayInput[nRandomIndex];
//         arrayInput[nRandomIndex] = nTemp;
//     }
//     let nDepartNum = arrayInput[startIndex];
//     // i 表示枢轴位置。
//     let j = startIndex + 1,i = startIndex;
//     for (; j <= endIndex; ++j) {
//         if (arrayInput[j] < nDepartNum) {
//             arrayInput[i] = arrayInput[j];
//             arrayInput[j] = arrayInput[i + 1];
//             ++i;
//         }
//     }
//     arrayInput[i] = nDepartNum;
//     return i;
// }
// const arrayTemp = utilityTools.generateRandomArray(0,100,10);
// console.log(`${arrayTemp}`);
// let i = randomDepart2(arrayTemp,0,arrayTemp.length - 1);
// console.log(`${arrayTemp} i is  ${i}`);