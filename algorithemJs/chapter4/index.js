"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chapter4program_1 = require("./chapter4program");
var chapter4_2program_1 = require("./chapter4_2program");
var chapter4_5program_1 = require("./chapter4_5program");
function runAllTest() {
    chapter4program_1.default.runTest();
    chapter4_2program_1.default.runTest();
    chapter4_5program_1.default.runTest();
}
runAllTest();
