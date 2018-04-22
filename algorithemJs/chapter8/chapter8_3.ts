import utilityTools from "./utilitytools";
// 算法导论思考题解答：
//#计数排序，原址排序方法，这种方法不是稳定的！！！！
function numIndexSort(arrayInput: Array<number>, nRangeMin: number, nRangeMax: number) {
    const arrayTemp = [];
    const arrayOut = [];
    const nRange = nRangeMax - nRangeMin + 1;
    for (let i = 0; i < nRange; ++i) {
        arrayTemp.push(0);
    }
    for (let i = 0; i < arrayInput.length; ++i) {
        arrayTemp[arrayInput[i] - nRangeMin] += 1;
    }
    for (let i = 0; i < nRange - 1; ++i) {
        arrayTemp[i + 1] += arrayTemp[i];
    }
    let arrayTempSave = arrayTemp.concat();
    console.log(`${arrayTemp}`);
    console.log(`${arrayTempSave}`);
    let i = arrayInput.length - 1;
    // 解释：如果 a[i] 和 a[j]做了交换，也就是a[i]放在了j的位置：
    // 则有，j = arrayTemp[a[j]];  --arrayTemp[a[j]];则必有 j <= arrayTempOld[a[i]]
    // 且 j > arrayTemp[a[i]];而假如a[i]没做过交换，满足了这个条件，则a[i]直接在原位不用动
    // 这样既可排序
    let nCount = 0;
    while (i >= 0) {
        let nTemp2 = arrayTempSave[arrayInput[i] - nRangeMin] - 1;
        let nTemp1 = arrayTemp[arrayInput[i] - nRangeMin] - 1;
        if ((i >= nTemp1)
            && (i <= nTemp2)) {
            --i;
        } else {
            let temp = arrayInput[i];
            //console.log(arrayInput[i]);
            // 交换nID2和i位置的数组
            const nId2 = arrayTemp[arrayInput[i] - nRangeMin] - 1;
            if (nId2 < 0) {
                console.log('Error out of range');
                throw new Error('out of range!!!!!!');
            }
            console.log(temp, nId2, i);
            arrayInput[i] = arrayInput[nId2];
            arrayInput[nId2] = temp;
            arrayTemp[temp - nRangeMin] -= 1;
        }
    }
}
// 网上有种方法是，直接将对应位的数字写在对应位上，如注释所示，这种方式是错误的，
// 因为假若排序的是带关键字的对象，很明显，对象是无法直接缓存赋值的。
// 错误的方式！！！！,对于面对对象排序，假若获取的是index，这种排序是无效的！！！
function numIndexSortError(arrayInput: Array<number>, nRangeMin: number, nRangeMax: number) {
    const arrayTemp = [];
    const arrayTempSave = [];
    const arrayOut = [];
    const nRange = nRangeMax - nRangeMin + 1;
    for (let i = 0; i < nRange; ++i) {
        arrayTemp.push(0);
    }

    for (let i = 0; i < arrayInput.length; ++i) {
        arrayTemp[arrayInput[i] - nRangeMin] += 1;
    }

    for (let i = 0; i < nRange - 1; ++i) {
        arrayTemp[i + 1] += arrayTemp[i];
    }
    for (let i = 0; i < nRange - 1; ++i) {
        arrayTempSave.push(arrayTemp[i]);
    }
    console.log(`${arrayTemp}`);
    arrayInput[0] = nRangeMin;
    for (let i = nRange - 1; i > 0; --i) {
        while (arrayTemp[nRange] !== arrayTemp[nRange - 1]) {
            arrayInput[arrayTemp[nRange] - 1] = i + nRange;
            --arrayTemp[nRange];
        }
    }
}
interface DataObjWithKey {
    m_key: number;
}
function numIndexSortObj<T extends DataObjWithKey>(arrayInput: Array<T>, nRangeMin: number, nRangeMax: number) {
    const arrayTemp = [];
    const arrayOut = [];
    const nRange = nRangeMax - nRangeMin + 1;
    for (let i = 0; i < nRange; ++i) {
        arrayTemp.push(0);
    }
    for (let i = 0; i < arrayInput.length; ++i) {
        arrayTemp[arrayInput[i].m_key - nRangeMin] += 1;
    }
    for (let i = 0; i < nRange - 1; ++i) {
        arrayTemp[i + 1] += arrayTemp[i];
    }
    let arrayTempSave = arrayTemp.concat();
    console.log(`${arrayTemp}`);
    console.log(`${arrayTempSave}`);
    let i = arrayInput.length - 1;
    // 解释：如果 a[i] 和 a[j]做了交换，也就是a[i]放在了j的位置：
    // 则有，j = arrayTemp[a[j]];  --arrayTemp[a[j]];则必有 j <= arrayTempOld[a[i]]
    // 且 j > arrayTemp[a[i]];而假如a[i]没做过交换，满足了这个条件，则a[i]直接在原位不用动
    // 这样既可排序
    let nCount = 0;
    while (i >= 0) {
        let nTemp2 = arrayTempSave[arrayInput[i].m_key - nRangeMin] - 1;
        let nTemp1 = arrayTemp[arrayInput[i].m_key - nRangeMin] - 1;
        if ((i >= nTemp1)
            && (i <= nTemp2)) {
            --i;
        } else {
            let temp = arrayInput[i];
            //console.log(arrayInput[i]);
            // 交换nID2和i位置的数组
            const nId2 = arrayTemp[arrayInput[i].m_key - nRangeMin] - 1;
            if (nId2 < 0) {
                console.log('Error out of range');
                throw new Error('out of range!!!!!!');
            }
            // console.log(temp,nId2,i);
            arrayInput[i] = arrayInput[nId2];
            arrayInput[nId2] = temp;
            arrayTemp[temp.m_key - nRangeMin] -= 1;
        }
    }
}
// 思考题8-3的思考，对于整数，显然使用基数排序，但是对于基数排序，之前的实现是有些问题的，
// 之前的实现会将原来不存在的位数按照0index作为关键字排序，此外为了维持排序的稳定性，每次
// 计数排序的过程中都要讲数组拷贝一遍，这太消耗空间了，所以新写一个方法，使用不稳定的原址
// 计数排序方法，作为基数排序的基础。
// 这里注意下，设置一个数轴nStartIndex，表示最高位已经被处理的start index，nStartIndex
// 之前的数据均是有序。
// 我之前的想法是错误的，基数排序最重要的特点是计数排序必须是稳定的，所以8-3还是只能用基数排序来实现。
// 对于8-3的第二字符类的处理，采取桶排序方法处理。
// 对从a-z的字符做桶排序
function stringSort(arrayInput: Array<string>) {
    stringSortHelp(arrayInput, 0);
}
function stringSortHelp(arrayInput: Array<string>, nIndexStart: number) {
    const helpArray: Array<Array<string>> = [];
    if (arrayInput.length <= 1) {
        return;
    }
    for (let i = 0; i < arrayInput.length; ++i) {
        if (nIndexStart === arrayInput[i].length) {
            if (!helpArray[0]) {
                helpArray[0] = [];
            }
            helpArray[0].push(arrayInput[i]);
        } else {
            let nIndex = arrayInput[i].charCodeAt(nIndexStart) - 'a'.charCodeAt(0) + 1;
            if (!helpArray[nIndex]) {
                helpArray[nIndex] = [];
            }
            helpArray[nIndex].push(arrayInput[i]);
        }

    }
    ++nIndexStart;
    for (let i = 1; i < helpArray.length; ++i) {
        if (helpArray[i]) {
            stringSortHelp(helpArray[i], nIndexStart);
        }
    }
    // const arrayOut = [];
    let k = 0;
    for (let i = 0; i < helpArray.length; ++i) {
        if (helpArray[i]) {
            for (let j = 0; j < helpArray[i].length; ++j) {
                arrayInput[k] = helpArray[i][j];
                ++k;
            }
        }
    }
    // return arrayInput[];
}

// 算法导论思考题8-4
// n*n的算法很简单，考虑下n*lgn，使用类似快排的算法
// 在第1次配对时，取一个红色的水壶将蓝色的水壶分成两队，比次红色水壶大的
// 放右边，比它小的放左边。在将得到的对应的蓝色水壶红色水壶分成两队，然后在
// 对左边和右边的子水壶队列重复这个过程。
enum Kettle_Color {
    red = 0,
    blue
}
class Kettle {
    constructor(volume: number, color: Kettle_Color) {
        this.m_color = color;
        this.m_volume = volume;

    }
    m_color: Kettle_Color
    m_volume: number
}
function getKettlePairNN(arrayBlue: Array<Kettle>, arrayRed: Array<Kettle>) {
    const arrayOut:Array<[Kettle,Kettle]> = [];
    if(arrayBlue.length !== arrayRed.length) {
        throw new Error('Error input!');
    } else {
        for(let i = 0; i < arrayBlue.length; ++i) {
            for(let j = 0; j < arrayRed.length; ++j)
            if(arrayBlue[i].m_volume === arrayRed[j].m_volume) {
                arrayOut.push([arrayBlue[i],arrayRed[j]]);
            }
        }
    }
    return arrayOut;
}
function getKettlePairLGN(arrayBlue: Array<Kettle>, arrayRed: Array<Kettle>) {

}
// 该函数将对应的瓶子分成两组
function departKetteLGN(arrayBlue: Array<Kettle>, arrayRed: Array<Kettle>
    ,startIndex:number,endIndex:number) {
        let bEqualHappen = false;
        let radix = arrayRed[startIndex];
        // j表示第一个大于radix的坐标
        let j = startIndex;
        //对蓝色瓶子进行划分
        for(let i = startIndex; i <= endIndex; ++i) {
            if(arrayBlue[i].m_volume  < radix.m_volume) {
                if(bEqualHappen) {
                    let nTemp = arrayBlue[i];
                    arrayBlue[i] = arrayBlue[j];
                    arrayBlue[j] = arrayBlue[j - 1];
                    arrayBlue[j - 1] = nTemp;
                }else {
                    let nTemp = arrayBlue[i];
                    arrayBlue[i] = arrayBlue[j];
                    arrayBlue[j] = nTemp;
                }
                //这里有问题
                ++j;
            }else if(arrayBlue[i].m_volume  === radix.m_volume) {
                const temp = arrayBlue[j];
                arrayBlue[j] = arrayBlue[i];
                arrayBlue[i] = temp;
                bEqualHappen = true;
                ++j;
            }
        }
        // 对红色瓶子进行划分
        radix = arrayBlue[j - 1];
        j = startIndex;
        for(let i = startIndex; i <= endIndex; ++i) {
            if(arrayRed[i].m_volume  < radix.m_volume) {
                if(bEqualHappen) {
                    let nTemp = arrayRed[i];
                    arrayRed[i] = arrayRed[j];
                    arrayRed[j] = arrayRed[j - 1];
                    arrayRed[j - 1] = nTemp;
                }else {
                    let nTemp = arrayRed[i];
                    arrayRed[i] = arrayRed[j];
                    arrayRed[j] = nTemp;
                }
                ++j;
            }else if(arrayRed[i].m_volume  === radix.m_volume) {
                const temp = arrayRed[j];
                arrayRed[j] = arrayRed[i];
                arrayRed[i] = temp;
                bEqualHappen = true;
                ++j;
            }
        }
        return j - 1;
}
function getKettePairLGN_Imp(arrayBlue: Array<Kettle>, arrayRed: Array<Kettle>
    ,startIndex:number,endIndex:number) {
        if(startIndex < endIndex) {
            let middle = departKetteLGN(arrayBlue,arrayRed,startIndex,endIndex);
            getKettePairLGN_Imp(arrayBlue,arrayRed,startIndex,middle - 1);
            getKettePairLGN_Imp(arrayBlue,arrayRed,middle + 1, endIndex);
        }
    }
class TestTempItem implements DataObjWithKey {
    m_key: number;
    m_singleFlag: number;
    constructor(key: number, id: number) {
        this.m_key = key;
        this.m_singleFlag = id;
    }
}
class IndexSortTestCase2 {
    private testCaseItem() {
        const nMin = -10;
        const nMax = 20;
        const nCount = 200;
        const arrayInput = utilityTools.generateRandomArray(nMin, nMax, nCount);
        console.log(`${arrayInput}`);
        const arrayOut = arrayInput.concat();
        numIndexSort(arrayOut, nMin, nMax);
        const arrayCheck = arrayInput.concat().sort((a: number, b: number) => {
            return a - b;
        });
        console.log(`${arrayOut}`);
        if (arrayCheck.length !== arrayOut.length) {
            console.log('sort failed!!!');
            return false;
        } else {
            for (let i = 0; i < arrayCheck.length; ++i) {
                if (arrayCheck[i] !== arrayOut[i]) {
                    console.log('sort failed!!!')
                    return false;
                }
            }
        }
        console.log('sort right!!');
        return true;
    }

    private generateObjTempArray(nMin: number, nMax: number, nCount: number) {

        const arrayOut: Array<TestTempItem> = [];
        const arrayInput = utilityTools.generateRandomArray(nMin, nMax, nCount);
        for (let i = 0; i < arrayInput.length; ++i) {
            arrayOut.push(new TestTempItem(arrayInput[i], i));
        }
        return arrayOut;
    }
    private testCaseObjItem() {
        const nMin = 1;
        const nMax = 40;
        const nCount = 200;
        const arrayTest = this.generateObjTempArray(nMin, nMax, nCount);
        const arraySorted = arrayTest.concat();
        numIndexSortObj(arraySorted, nMin, nMax);
        this.checkArrayObjSortRight(arraySorted, arrayTest);
    }
    private checkArrayObjSortRight(arraySorted: Array<TestTempItem>, arrayOrgin: Array<TestTempItem>) {
        if (arraySorted.length !== arrayOrgin.length) {
            console.log('array length is not equal!!!');
            return false;
        }
        for (let i = 1; i < arraySorted.length; ++i) {
            if (arraySorted[i - 1].m_key > arraySorted[i].m_key) {
                console.log('array order is not right!!!');
                return false;
            }
        }
        const arrayTemp1 = arraySorted.concat().sort((data1, data2) => {
            return data1.m_singleFlag - data2.m_singleFlag;
        });
        const arrayTemp2 = arrayOrgin.concat().sort((data1, data2) => {
            return data1.m_singleFlag - data2.m_singleFlag;
        });
        for (let i = 0; i < arrayTemp1.length; ++i) {
            if (arrayTemp1[i].m_singleFlag !== arrayTemp2[i].m_singleFlag ||
                arrayTemp1[i].m_key !== arrayTemp2[i].m_key) {
                console.log('array item change!!!');
                return false;
            }
        }
        console.log('array sorted right!!!')
        return true;
    }
    testCaseWordsSort() {
        const arrayInput = [];
        arrayInput.push('ab');
        arrayInput.push('a');
        arrayInput.push('b');
        arrayInput.push('fsdafsadf');
        arrayInput.push('xxxxxxxx');
        arrayInput.push('');
        arrayInput.push('fdsaf3dfdsaf');
        arrayInput.push('')
        arrayInput.push('dfdaf');
        arrayInput.push('tsdfasdf');
        arrayInput.push('hgdfdffds');
        let arrayTemp = arrayInput.concat();
        stringSort(arrayTemp);

        console.log(`${arrayTemp}`);
    }
    runTestCase() {
        this.testCaseItem();
        this.testCaseObjItem();
    }
}

const tempCaseIndexSort = new IndexSortTestCase2();
//tempCaseIndexSort.runTestCase();
tempCaseIndexSort.testCaseWordsSort();