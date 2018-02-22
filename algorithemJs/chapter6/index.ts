import heapTestCasedefaut from './chapter6_1';
import  QueTestCaseDefault from './chapter6_2';
import TestItem from './chapter6_3';
function runAllTest() {
    heapTestCasedefaut.runTest();
    QueTestCaseDefault.runTestCase();
    TestItem.runTestCase();
}
runAllTest();