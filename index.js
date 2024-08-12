const result = document.querySelector('.result')
const buttons = document.querySelectorAll('button')

let prev = ''
let current = ''
let operator = ''

const updateDisplay = () => {
  result.textContent = current || prev || '0'
}

const handleNumber = (num) => {
  if(current.length < 8) current += num
}

const handleOperator = (op) => {
  if(current === '' && prev === '') return;
  if(prev === '') {
    prev = current
    current = ''
  }
  operator = op
}

const calculate = () => {
  let calculation = 0

  const prevNum = Number(prev)
  const currentNum = Number(current)

  if(isNaN(prevNum) || isNaN(currentNum)) return

  switch(operator) {
    case '+':
      calculation = prevNum + currentNum
      break
    case '-':
      calculation = prevNum - currentNum
      break
    case 'x':
      calculation = prevNum * currentNum
      break
    case '/':
      calculation = prevNum / currentNum
      break
    case '%':
      calculation = prevNum % currentNum
      break
    default:
      return;
  }

  current = String(calculation)
  prev = ''
  operator = ''
}

const handleAction = (action) => {
  switch(action) {
    case 'clear':
      if(current) {
        current = current.split('').slice(0, current.length - 1).join('')
      } else {
        current = ''
        prev = ''
        operator = ''
      }
      break
    case '+/-':
      current = String(Number(current) * (-1))
      break
    case '.':
      if(!current.includes('.')) {
        if(current === '') current = '0.'
        else current += '.'
      }
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
  } else if(['+', '-', 'x', '/', '%'].includes(buttonContent)) {
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