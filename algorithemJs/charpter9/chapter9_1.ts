function getMinNumFromArray(arrayInput: Array<number>) {
    if (arrayInput.length <= 0) throw new Error("Error input!");
    let nMin = arrayInput[0];
    for (let i = 0; i < arrayInput.length; ++i) {
        if (arrayInput[i] < nMin) {
            nMin = arrayInput[i];
        }
    }
}
function getMaxNumFromArray(arrayInput: Array<number>) {
    if (arrayInput.length <= 0) throw new Error("Error input!");
    let nMax = arrayInput[0];
    for (let i = 0; i < arrayInput.length; ++i) {
        if (arrayInput[i] > nMax) {
            nMax = arrayInput[i];
        }
    }
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
    let arrayCompareIndex = [];
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