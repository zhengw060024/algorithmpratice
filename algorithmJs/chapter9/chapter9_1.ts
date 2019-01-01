import utilityTools from './utilitytools';
function getMinNumFromArray(arrayInput: Array<number>) {
    if (arrayInput.length <= 0) throw new Error("Error input!");
    let nMin = arrayInput[0];
    for (let i = 0; i < arrayInput.length; ++i) {
        if (arrayInput[i] < nMin) {
            nMin = arrayInput[i];
        }
    }
    return nMin;
}
function getMaxNumFromArray(arrayInput: Array<number>) {
    if (arrayInput.length <= 0) throw new Error("Error input!");
    let nMax = arrayInput[0];
    for (let i = 0; i < arrayInput.length; ++i) {
        if (arrayInput[i] > nMax) {
            nMax = arrayInput[i];
        }
    }
    return nMax;
}
interface MinMaxPair {
    min: number;
    max: number;
}
function getMinMaxFromArray(arrayInput: Array<number>): MinMaxPair {
    if (arrayInput.length <= 0) throw new Error("Error input!");
    const resultTemp: MinMaxPair = {
        min: 0,
        max: 0
    }
    let nStartIndex = 0;
    if (arrayInput.length % 2 === 0) {
        nStartIndex = 2;
        if (arrayInput[0] < arrayInput[1]) {
            resultTemp.min = arrayInput[0];
            resultTemp.max = arrayInput[1];
        } else {
            resultTemp.min = arrayInput[1];
            resultTemp.max = arrayInput[0];
        }
    } else {
        resultTemp.min = arrayInput[0];
        resultTemp.max = arrayInput[0];
        nStartIndex = 1;
    }
    for (; nStartIndex < arrayInput.length;) {
        if (arrayInput[nStartIndex] < arrayInput[nStartIndex + 1]) {
            if (resultTemp.max < arrayInput[nStartIndex + 1]) {
                resultTemp.max = arrayInput[nStartIndex + 1];
            }
            if (resultTemp.min > arrayInput[nStartIndex]) {
                resultTemp.min = arrayInput[nStartIndex];
            }
        } else {
            if (resultTemp.min > arrayInput[nStartIndex + 1]) {
                resultTemp.min = arrayInput[nStartIndex + 1];
            }
            if (resultTemp.max < arrayInput[nStartIndex]) {
                resultTemp.max = arrayInput[nStartIndex];
            }
        }
        nStartIndex += 2;
    }
    return resultTemp;
}
interface itemTemp {
    num:number;
    index:number;
}
interface FirstSecondItem {
    first:number;
    second:number;
}
// 算法导论第九章第一节习题1
/**
 * 思路，找到最小值，并记录其找最小值比较路径的路径，
 * 而 。找最小值的方式采用锦标赛的方式，也就是2个一组，小的
 * 晋级，最终次小值一定在最小值的比较路径上。
 * @param arrayInput 
 */
function getSecondMinNum(arrayInput:Array<number>) :FirstSecondItem {
    if(arrayInput.length < 2) throw new Error('Error Input!')
    let nStartIndex = arrayInput.length - 1;
    let arrayTemp: itemTemp[] = [];
    let arrayCompareIndex:Array<Array<number>> = [];
    for(let i = 0; i < arrayInput.length; ++i) {
        arrayTemp.push({
            num:arrayInput[i],
            index:i
        });
        arrayCompareIndex.push([]);
    }
    while(arrayTemp.length > 1) {
        let i = 0;
        let arrayHelp = [];
        for( i = 0; i < arrayTemp.length - 1; i+=2) {
            if(arrayTemp[i].num < arrayTemp[i + 1].num) {
                arrayHelp.push(arrayTemp[i]);
                arrayCompareIndex[arrayTemp[i].index].push(arrayTemp[i + 1].index);
            }else {
                arrayHelp.push(arrayTemp[i + 1]);
                arrayCompareIndex[arrayTemp[i + 1].index].push(arrayTemp[i].index);
            }
        }
        if(i === arrayTemp.length -1) {
            arrayHelp.push(arrayTemp[i]);
        }
        arrayTemp = arrayHelp.concat();
    }
    let nMinIndex = arrayTemp[0].index;
    let nSecondMinIndex = arrayCompareIndex[nMinIndex][0];
    let nSecondMin = arrayInput [nSecondMinIndex];
    const arrayIndex = arrayCompareIndex[nMinIndex]
    for(let i = 0; i < arrayIndex.length; ++i) {
        if( nSecondMin > arrayInput[arrayIndex[i]]) {
            nSecondMinIndex = arrayIndex[i];
            nSecondMin = arrayInput[arrayIndex[i]]
        }
    }
    return  {
        first:nMinIndex,
        second:nSecondMinIndex
    }
}
// 算法导论9.1-2的证明：最坏情况获取最大最小组合下界为 ceil(3n/2) -2
// 考虑所有的比较情况，我们可以证明在两组比较中有相同数字的比较效率肯定比没有相同数字的效率要低。
// 考虑最坏的这样的情况 a < b,a<c,我们只能通过两次判断排除b,c 最小值的可能和a最大值的可能，如果要排除
// b，c中的一個我們必須額外添加一次判斷，但是我們可以通過兩組不相同組合排除兩個最大可能和兩個最小可能
// 所以沒有重複比較判斷的效率要比有重複判斷的效率要高。
// 這樣對於任意一組沒有重複數據判斷的流程來説，我們最多做 [n/2]次比較，排除[n /2]個數據的最大可能，和[n/2]
// [n /2]數據的最小可能，这样我们就得到两个独立的子问题[n/2]最小值比较和[n /2]最大值比较，本别统计最坏情况
// 比较次数我们可以推导出。
// 總的最壞比較次數應爲  maxmin(n) = floor(n / 2) + 2(floor(n /2) -1) + (n % 2) * 2)
// 显然，n为偶数时是成立的，当n为奇数时，ceil(3n /2) - 2 = 3(n-1) / 2 = maxmin(n)
// 这样就证明了最坏情况的比较次数下界ceil(3n/2) -2
class TestCase_1 {
    constructor() {
        
    }
    testCaseGetMinMax() {
        const arrayLen = utilityTools.generateRandom(10,20);
        let arrayTestCase =  utilityTools.generateRandomArray(1,1000,arrayLen);
        console.log(`origin number sequence is ${arrayTestCase}`)
        let nMin = getMinNumFromArray(arrayTestCase);
        let nMax = getMaxNumFromArray(arrayTestCase);
        let MinMaxPair = getMinMaxFromArray(arrayTestCase);
        let MinSecondPair = getSecondMinNum(arrayTestCase);
        let arrayTemp = arrayTestCase.concat();
        arrayTemp.sort((a,b) => {
            return a - b;
        });
        console.log(`min number is ${nMin}, max number is ${nMax}`);
        console.log(`minMaxpair is: `,MinMaxPair);
        console.log(`minSecondPairIndex is`,MinSecondPair);
        if(nMin === arrayTemp[0]) {
            console.log('testcase get min item success!');
        } else {
            console.log('testcase get min item failed!');
        }
        if(nMax === arrayTemp[arrayTemp.length - 1]) {
            console.log('testcase get max item success!');
        } else {
            console.log('testcase get max item failed');
        }
        if(MinMaxPair.max === arrayTemp[arrayTemp.length - 1] && 
        MinMaxPair.min === arrayTemp[0]) {
            console.log('testcase get minmax success!');
        } else {
            console.log('testcase get minmax failed!')
        }
        if(arrayTestCase[MinSecondPair.first]  === arrayTemp[0] &&
        arrayTestCase[MinSecondPair.second] === arrayTemp[1]) {
            console.log('testcase get second max success');
        } else {
            console.log('testcase get seconde min failed!');
        }
    }
}
let testCaseDefaut  = new  TestCase_1();
testCaseDefaut.testCaseGetMinMax();