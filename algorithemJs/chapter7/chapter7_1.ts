import utilityTools from "./utilitytools";

// 算法导论第7章第一节
// 书中的快速排序实现ts
function quicksort(arrayInput: Array<number>) {
    quicksortImp(arrayInput, 0, arrayInput.length - 1);

}
function quicksortImp(arrayInput: Array<number>, startIndex: number, endIndex: number) {
    if (startIndex < endIndex) {
        const nMiddleIndex = quickDepartByEndIndex(arrayInput, startIndex, endIndex);
        quicksortImp(arrayInput, startIndex, nMiddleIndex - 1);
        quicksortImp(arrayInput, nMiddleIndex + 1, endIndex);
    }
}
// 以末尾元素作为分割元素
function quickDepartByEndIndex(arrayInput: Array<number>,
    startIndex: number, endIndex: number): number {
    let i = startIndex; let j = startIndex;
    // const nTemp = arrayInput[endIndex];
    // i 表示第一个可能大于分割枢轴index（未校验）
    for (; j < endIndex; ++j) {
        if (arrayInput[j] < arrayInput[endIndex]) {
            // 交换 arrayInput[j] 和 arrayInput[i]
            const nTemp = arrayInput[i];
            arrayInput[i] = arrayInput[j];
            arrayInput[j] = nTemp;
            ++i;
        }
    }
    const nTemp = arrayInput[i];
    arrayInput[i] = arrayInput[endIndex];
    arrayInput[endIndex] = nTemp;
    return i;
}
// 练习7.1-2修改partition使得元素都相同时返回中间的id
// 思路同时从两端向中间推进。
// 这个需要注意边界条件！！！
function quickDepartMiddle(arrayInput: Array<number>, startIndex: number, endIndex: number) {
    let i = startIndex;
    let j = endIndex - 1;
    while(true) {
        // 找到第一个大于等于枢轴的数据就停下
        // 这里不用添加边界测试，因为枢轴数据就在最右侧。
        while(arrayInput[i] < arrayInput[endIndex]){
            ++i;
        }
        // 找到第一个小于等于枢轴的数据
        // 注意，这里需要添加边界测试
        while(arrayInput[j] > arrayInput[endIndex] && j >= startIndex) {
            --j;
        }
        if(!(i < j)) {
            const nTemp = arrayInput[i];
            arrayInput[i] = arrayInput[endIndex];
            arrayInput[j] = nTemp;
            return i;
        }
        const nTemp = arrayInput[i];
        arrayInput[i] =arrayInput[j];
        arrayInput[j] = nTemp;
        ++i;
        --j;
    }
}
// 
// 测试代码是否正确
class quickSortTest {
    constructor() {

    }
    // 算法导论中的quicksort测试验证
    private checkSortResult(arrayInput: Array<number>, arrayToCheck: Array<number>) {
        // 检查排序后的数组是否合法
        const arraySortRight = arrayInput.concat().sort((a, b) => {
            return a - b;
        });
        if (arrayToCheck.length !== arraySortRight.length) {
            console.log('quick sort failed ,items number is not equal!!!');
            return false;
        } else {
            for (let i = 0; i < arrayToCheck.length; ++i) {
                if (arrayToCheck[i] !== arraySortRight[i]) {
                    console.log('quick sort failed!!!');
                    return false;
                }
            }
        }
        return true;
    }
    testQSort1() {
        const arrayNum = utilityTools.generateRandom(1, 1000);
        console.log(`arrayNum is ${arrayNum}`);
        const arrayTest = utilityTools.generateRandomArray(1, 1000, arrayNum);
        console.log(`array to sort is ${arrayTest}`);

        const arrayToSort = arrayTest.concat();
        quicksort(arrayToSort);
        console.log(`array quicksorted si ${arrayToSort}`);
        const testResult = this.checkSortResult(arrayTest, arrayToSort);
        if (testResult) {
            console.log('quick sort is right!!!');
        }
    }
}
const qSortTestCase = new quickSortTest();
qSortTestCase.testQSort1(); 