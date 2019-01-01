"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateRandom(min, max) {
    var range = max - min;
    var randNum = Math.round(Math.random() * range) + min;
    return randNum;
}
function generateRandomArray(min, max, itemNum) {
    var ArrayRandom = [];
    for (var i = 0; i < itemNum; ++i) {
        ArrayRandom.push(generateRandom(min, max));
    }
    return ArrayRandom;
}
var utilityTools = {
    generateRandom: generateRandom,
    generateRandomArray: generateRandomArray
};
exports.default = utilityTools;
