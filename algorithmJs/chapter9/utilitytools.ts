function generateRandom(min: number, max: number) {
    const range = max - min;
    const randNum = Math.floor(Math.random() * (1+range)) + min;
    return randNum;
}
// 这种写法是错误的，因为，以0，到10 为例子，0-0.4999999999之间产生的都是0，
// 9.5-到10之间的数值只有 8.5-9.5之间的一半，所以用这种方法产生的随机数
// 首尾只有普通数字的一半
function generateRandomOldErr(min: number, max: number) {
    const range = max - min;
    const randNum = Math.round(Math.random() * range) + min;
    return randNum;
}
function generateRandomArray(min: number, max: number, itemNum: number) {
    const ArrayRandom: Array<number> = [];
    for (let i = 0; i < itemNum; ++i) {
        ArrayRandom.push(generateRandom(min, max));
    }
    return ArrayRandom;
}


interface utilityTools {
    generateRandom: (min: number, max: number) => number;
    generateRandomArray: (min: number, max: number, itemNum: number) => Array<number>;
    generateRandomOldErr: (min: number, max: number) => number;
}
const utilityTools: utilityTools = {
    generateRandom: generateRandom,
    generateRandomArray: generateRandomArray,
    generateRandomOldErr: generateRandomOldErr
};
export default utilityTools;
