// 算法导论思考题解答：
//#计数排序，原址排序方法，这种方法不是稳定的！！！！
// 网上有种方法是，直接将对应位的数字写在对应位上，如注释所示，这种方式是错误的，
// 因为假若排序的是带关键字的对象，很明显，对象是无法直接缓存赋值的。
function numIndexSort(arrayInput: Array<number>, nRangeMin: number, nRangeMax: number) {
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
    let i = arrayInput.length - 1;
    // 解释：如果 a[i] 和 a[j]做了交换，也就是a[i]放在了j的位置：
    // 则有，j = arrayTemp[a[i]];  --arrayTemp[a[i]];则必有 j <= arrayTempOld[a[i]]
    // 且 j > arrayTemp[a[i]];而假如a[i]没做过交换，满足了这个条件，则a[i]直接在原位不用动
    // 这样既可排序
    while (i >= 0) {
        if(i >= arrayTemp[i] && i <= arrayTempSave[i]) {
            --i;
        } else {
            let temp = arrayInput[i];
            const nId2 = arrayTemp[arrayInput[i] - nRangeMin] - 1;
            arrayInput[i] = arrayInput[nId2];
            arrayInput[nId2] = temp;
            arrayTemp[temp - nRangeMin] -= 1;
        }
    }
    // 错误的方式！！！！
    // arrayInput[0] = nRangeMin;
    // for(let i = nRange - 1; i > 0; --i) {
    //     while(arrayTemp[nRange] !== arrayTemp[nRange - 1]) {
    //         arrayInput[arrayTemp[nRange] - 1] = i + nRange;
    //         --arrayTemp[nRange];
    //     }
    // }
}