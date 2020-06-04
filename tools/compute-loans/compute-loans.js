
const debtMoneyTotal = 1180000;
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

function computeDetail(debtMoneyTotalParam){
  let repaymentMonth = computeTotal(debtMoneyTotal)
  let interestMonth = debtMoneyTotalParam * monthRate
  let debtMoneyMonth = repaymentMonth - interestMonth
  let remainDebtMoneyTotal = debtMoneyTotalParam - debtMoneyMonth

  // console.log(interestMonth, debtMoneyMonth, remainDebtMoneyTotal)
  return remainDebtMoneyTotal
}

function computeMonthly(month, minusMoney = 0) {
  let remainDebtMoneyTotal = debtMoneyTotal
  for(let i = 1; i <= month; i ++) {
    remainDebtMoneyTotal = computeDetail(remainDebtMoneyTotal)
  }
  return remainDebtMoneyTotal - minusMoney
}

console.log(computeMonthly(10))
