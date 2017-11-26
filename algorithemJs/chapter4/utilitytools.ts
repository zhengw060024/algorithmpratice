function generateRandom(min: number, max: number) {
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

}
const utilityTools: utilityTools = {
    generateRandom: generateRandom,
    generateRandomArray: generateRandomArray
};
export default utilityTools;
