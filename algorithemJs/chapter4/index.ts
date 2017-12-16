import MaxSubSeqSum from './chapter4program'
import MatrixTest from './chapter4_2program'
import chipTestCheck from './chapter4_5program'
import MongeTestCheck from'./chapter4_6program'
function runAllTest() {
    MaxSubSeqSum.runTest();
    MatrixTest.runTest();
    chipTestCheck.runTest();
    MongeTestCheck.runTest();
}
runAllTest();