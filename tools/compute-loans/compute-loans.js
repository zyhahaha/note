
const debtMoneyTotalOrigin = 1180000;
const monthRate = 0.0588 / 12
const monthTotal = 30 * 12

function computeTotal(debtMoneyTotalParam){
  let commonVar = (1 + monthRate) ** monthTotal
  let fractionUp = monthRate * commonVar
  let fractionDown = commonVar - 1
  let repaymentMonth = debtMoneyTotalParam * (fractionUp / fractionDown)
  let repaymentTotal = repaymentMonth * monthTotal
  let interestTotal = repaymentTotal - debtMoneyTotalParam

  // console.log(repaymentMonth, repaymentTotal, interestTotal)
  return repaymentMonth;
}

/*********************** * **************************/

function computeDetail(debtMoneyTotalParam, repaymentMonth){
  let interestMonth = debtMoneyTotalParam * monthRate
  let debtMoneyMonth = repaymentMonth - interestMonth
  let remainDebtMoneyTotal = debtMoneyTotalParam - debtMoneyMonth

  // console.log(interestMonth, debtMoneyMonth, remainDebtMoneyTotal)
  return remainDebtMoneyTotal
}

function computeMonthly(debtMoneyTotalParam, month, minusMoney = 0) {
  let remainDebtMoneyTotal = debtMoneyTotalParam
  let repaymentMonth = computeTotal(debtMoneyTotalParam)
  for(let i = 1; i <= month; i ++) {
    remainDebtMoneyTotal = computeDetail(remainDebtMoneyTotal, repaymentMonth)
  }
  
  // console.log(remainDebtMoneyTotal)
  return remainDebtMoneyTotal - minusMoney
}

let aaa = computeMonthly(debtMoneyTotalOrigin, 18, 200000)
let bbb = computeMonthly(aaa, 12, 200000)
let ccc = computeMonthly(bbb, 12, 200000)
let ddd = computeMonthly(ccc, 12, 200000)
let eee = computeMonthly(ddd, 12, 200000)
// let fff = computeMonthly(eee, 12, 100000)
console.log(computeMonthly(eee, 1))
