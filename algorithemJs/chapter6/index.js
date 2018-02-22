"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chapter6_1_1 = require("./chapter6_1");
var chapter6_2_1 = require("./chapter6_2");
var chapter6_3_1 = require("./chapter6_3");
function runAllTest() {
    chapter6_1_1.default.runTest();
    chapter6_2_1.default.runTestCase();
    chapter6_3_1.default.runTestCase();
}
runAllTest();
