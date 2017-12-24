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
const COSTINT = 10;
const COSTHIRE = 100;
function generateInterViewArray() {
   const interviewNum =  utilityTools.generateRandom(10,40);
   const arrayTemp = utilityTools.generateRandomArray(1,10,interviewNum);
   const arrayPerson : Array<candidate>= [];
   for(let i = 0; i < arrayTemp.length; ++i) {
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
function hireAssistant(arrayCandidate: Array<candidate>) {
    let totalCost = {
        interviewcost: 0,
        hirecost: 0
    }
    let bestid = 0;

    for (let i = 1; i < arrayCandidate.length; ++i) {
        const skilllevel = interview(arrayCandidate[i], totalCost);
        if (skilllevel > arrayCandidate[bestid].skilllevel) {
            bestid = i;
            hire(arrayCandidate[i], totalCost);
        }
    }
}