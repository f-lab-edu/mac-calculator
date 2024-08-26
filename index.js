//1. +, -, /, *, %를 누르고 =를 누르면 해당하는 계산이 된다.
//1-1. =를 누른 후의 숫자에 연산자 -> 숫자 -> = : 숫자 연산자 숫자 계산
//1-2. =를 누른 후의 숫자에 새로운 숫자 -> = : 새로운 숫자
//1-3. =를 누른 후의 숫자에 = : 숫자 그대로
//1-4. =를 누른 후의 숫자에 연산자 -> = : 숫자 그대로

//2. 숫자가 있을 때 +/-를 누르면 해당 숫자에 (-1)을 곱한다.
// 연산자 전후 아무 숫자에 +/-를 누르면 해당 숫자는 (-1)이 곱해짐.
// ex)3 -> * -> 4 -> +/- -> = : -12

//3. clear를 누르면 숫자가 뒤에서부터 하나씩 지워지고, 남은 숫자가 없으면 0이 된다.
//4. 숫자를 누르지 않고 연산자를 누르면 아무 일도 일어나지 않는다.
//5. 숫자가 있을 때 .을 누르면 숫자 옆에 .이 생기고, 없으면 0.이 된다.
//6. 나눗셈이나 숫자를 무한히 키울 때 최대 숫자의 길이는 8이다.
//7. current가 infinity이면 error 띄우고, 이 때 clear 누르면 바로 0이 된다.

const result = document.querySelector('.result')
const buttons = document.querySelectorAll('button')

let prev = ''
let current = ''
let operator = ''
let isCalculated = false

//7
const updateDisplay = () => {
  result.textContent = current === 'Infinity' ? 'error' : current || prev || '0'
}

//6
const handleNumber = (num) => {
  //1-2
  if(isCalculated) {
    current = num.toString()
    isCalculated = false
  }
  else if(current.length < 8) current += num
}

const handleOperator = (op) => {
  //4
  if(current === '' && prev === '') return;
  //1
  if(prev === '') {
    prev = current
    current = ''
  } else if(current !== '') {
    calculate();
    prev = current;
    current = '';
  }
  operator = op
}

const calculate = () => {
  isCalculated = true
  let calculation = 0

  const prevNum = Number(prev)
  const currentNum = Number(current)

  //1
  switch(operator) {
    case '+':
      //1-4
      if(currentNum === 0) calculation = prevNum
      else calculation = prevNum + currentNum
      break
    case '−':
      if(currentNum === 0) calculation = prevNum
      else calculation = prevNum - currentNum
      break
    case '×':
      if(currentNum === 0) calculation = prevNum
      else calculation = prevNum * currentNum
      break
    case '÷':
      if(currentNum === 0) calculation = prevNum
      else calculation = prevNum / currentNum
      break
    case '%':
      calculation = prevNum % currentNum
      break
    default:
      return;
  }

  //6
  current = String(calculation).slice(0, 8)
  prev = ''
  operator = ''
}

const handleAction = (action) => {
  switch(action) {
    case 'clear':
      //7
      if(current === 'Infinity') {
        current = 0
      }
      //3
      else if(current) {
        current = current.split('').slice(0, current.length - 1).join('')
      } else {
        current = ''
        prev = ''
        operator = ''
      }
      break
    //2
    case '+/−':
      current = String(Number(current) * (-1))
      break
    //5
    case '.':
      if(!current.includes('.')) {
        if(current === '') current = '0.'
        else current += '.'
      }
    //1-1, 1-3
    case '=':
      calculate()
      break
  }
}

const buttonClick = (event) => {
  const button = event.target

  if(button.tagName !== 'BUTTON') return

  const buttonContent = button.textContent

  if(current === '' && buttonContent === '0') return

  if(!isNaN(buttonContent)) {
    handleNumber(buttonContent)
  } else if(['+', '−', '×', '÷', '%'].includes(buttonContent)) {
    handleOperator(buttonContent)
  } else {
    handleAction(buttonContent)
  }

  updateDisplay()
}

buttons.forEach(button => {
  button.addEventListener('click', buttonClick)
})

updateDisplay()