// 雇佣问题ts代码
import utilityTools from './utilitytools'
interface candidate {
    id: number;
    skilllevel: number;
}
interface cost {
    interviewcost: number;
    hirecost: number;
}
interface HiredProcedure {
    cost: cost;
    arrayHiredId: Array<number>
}
const COSTINT = 10;
const COSTHIRE = 100;
function generateInterViewArray() {
    const interviewNum = utilityTools.generateRandom(10, 40);
    const arrayTemp = utilityTools.generateRandomArray(1, 10, interviewNum);
    const arrayPerson: Array<candidate> = [];
    for (let i = 0; i < arrayTemp.length; ++i) {
        arrayPerson.push({
            id: i,
            skilllevel: arrayTemp[i]
        });
    }
    return arrayPerson;
}
function interview(person: candidate, totalCost: cost) {
    totalCost.interviewcost += COSTINT;
    return person.skilllevel;
}
function hire(person: candidate, totalCost: cost) {
    totalCost.hirecost += COSTHIRE;
}
function hireAssistant(arrayCandidate: Array<candidate>): HiredProcedure {
    let totalCost = {
        interviewcost: 0,
        hirecost: 0
    }
    const arrayHiredId = [];
    let bestid = 0;
    arrayHiredId.push(0);
    for (let i = 1; i < arrayCandidate.length; ++i) {
        const skilllevel = interview(arrayCandidate[i], totalCost);
        if (skilllevel > arrayCandidate[bestid].skilllevel) {
            bestid = i;
            hire(arrayCandidate[i], totalCost);
            arrayHiredId.push(i);
        }
    }
    return {
        cost: totalCost,
        arrayHiredId: arrayHiredId
    };
}

/////////////////////////////////////
//使用random(0，1)生成random(a,b),算法导论习题5_1_2
//整理我的思路是这样的：生成0 - (b - a)个随机数，而对于当前的每次随机测试
// 我们只能生成0 到2^k - 1个随机数(在做k的随机01测试)，找出最小的k使2^k-1得等于b-a，
// 将这个过程作为一次roll点，对每个大于b-a的数字重新roll点直到找到范围内的数字
function getRandom01() {
    return Math.round(Math.random());
}
function getK2powernearMaxTo(num: number) {
    let i = 1;
    let MaxNum = 2;
    while (MaxNum - 1 < num) {
        MaxNum = MaxNum * 2;
        ++i;
    }
    return i;
}
function makeRandomByKpower(kpower: number) {
    let nResult = 0;
    let nPower = 1;
    for (let i = 0; i < kpower; ++i) {
        const Temp = getRandom01();
        nResult += nPower * Temp;
        nPower *= 2;
    }
    return nResult;
}
interface CountItem {
    nRandomNum: number;
    nCount: number;
}
function generateRandomAB(a: number, b: number): CountItem {
    const nLength = b - a;
    const nK = getK2powernearMaxTo(b - a);
    let nRandom = 0;
    let nTotalCount = 0;
    do {
        nRandom = makeRandomByKpower(nK);
        // console.log(nRandom);
        nTotalCount += nK;
    } while (nRandom > nLength);
    return {
        nRandomNum: (nRandom + a),
        nCount: nTotalCount
    }
}

////////////////////
//算法导论习题5-1-3
//无偏差输出0,1
////////////////////
/**
 * 0.75的概率产生0,0.25的概率产生1
 */
function generate01NoEqual() {
    const k = utilityTools.generateRandom(1, 20);
    if (k <= 15) {
        return 0;
    }
    return 1;
}
// 思路每两组组合成为一次roll点测试，当出现01，和10时分别返回0,1,其他情况重复roll点测试即可
function generateToNoEqualWrap() {
    const t1 = generate01NoEqual();
    const t2 = generate01NoEqual();
    return 2*t1 + t2;
}
interface Equal01Result {
    nRandomResult:number;
    nCount :number;
}
function generate01Equal() :Equal01Result{
    let nCount = 0;
    while (true) {
        const k = generateToNoEqualWrap();
        ++nCount;
        if(k === 1) {
            return {
                nRandomResult:0,
                nCount:nCount
            };
        }else if(k === 2) {
            return {
                nRandomResult:1,
                nCount:nCount
            };
        }
    }
}
function testGenerateEqual() {
    let objTemp = {
        nCount0: 0,
        nGenGount0:0,
        nCount1: 0,
        nGenGount1:0
    }
    for(let i = 0; i < 10000; ++i) {
        const temp = generate01Equal();
        if(temp.nRandomResult === 0) {
            objTemp.nGenGount0 += temp.nCount;
            ++objTemp.nCount0;
        } else {
            objTemp.nGenGount1 += temp.nCount;
            ++objTemp.nCount1;
        }
    }
    console.log(objTemp);
}
function testCaseNoEqual() {
    let k = 0;
    let t = 0;
    for(let i = 0; i < 10000; ++i) {
        if(generate01NoEqual() === 1) {
            ++t;
        } else {
            ++k;
        }
    }
    console.log(`0 num is ${k},1 num is ${t}`);

}
function testCaseGenerate() {
    let obj:any = {};
    for(let i = 0; i < 10000; ++i) {
        const k = utilityTools.generateRandom(1,20);
        if(!obj[k]) {
            obj[k] = 1;
        }else {
            ++obj[k];
        }
    }
    console.log(obj);
}
function testCaseGenerateOldErr() {
    let obj:any = {};
    for(let i = 0; i < 10000; ++i) {
        const k = utilityTools.generateRandomOldErr(1,20);
        if(!obj[k]) {
            obj[k] = 1;
        }else {
            ++obj[k];
        }
    }
    console.log(obj);
}


class RandomGenTestCase {
    constructor() {

    }
    runTest() {
        this.testCaseInterview();
        this.testCaseRandomAB();
        this.testEqual01();
    }
    testCaseInterview() {
        const arrayInterview = generateInterViewArray();
        console.log(arrayInterview);
        console.log(hireAssistant(arrayInterview));
    }
    // 最好做个随机千次测试，然后对每种情况计数
    testCaseRandomAB() {
        const nRandomCount = 10/*utilityTools.generateRandom(2,11)*/;
        const nRandomStart = utilityTools.generateRandom(0, 11);
        const nRandomEnd = nRandomStart + nRandomCount - 1;
        let objTemp: any = {};
        for (let i = 0; i < nRandomCount * 500; ++i) {
            const Temp = generateRandomAB(nRandomStart, nRandomEnd);
            if (objTemp[Temp.nRandomNum]) {
                (objTemp[Temp.nRandomNum])['count']++;
                (objTemp[Temp.nRandomNum])['totalcount'] += Temp.nCount;
            } else {
                objTemp[Temp.nRandomNum] = { count: 0, totalcount: 0 };
            }
        }
        console.log(objTemp);
    }
    testEqual01(){
        testGenerateEqual();
    }
}
testGenerateEqual();
// testCaseGenerate();
// testCaseNoEqual();
// const RandomTest = new RandomGenTestCase();
// RandomTest.testCaseInterview();
// RandomTest.testCaseRandomAB();
