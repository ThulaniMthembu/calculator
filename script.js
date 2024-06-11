const zeroBtn = document.getElementById('btnZero');
const oneBtn = document.getElementById('btnOne');
const twoBtn = document.getElementById('btnTwo');
const threeBtn = document.getElementById('btnThree');
const fourBtn = document.getElementById('btnFour');
const fiveBtn = document.getElementById('btnFive');
const sixBtn = document.getElementById('btnSix');
const sevenBtn = document.getElementById('btnSeven');
const eightBtn = document.getElementById('btnEight');
const nineBtn = document.getElementById('btnNine');
const addBtn = document.getElementById('btnAdd');
const minusBtn = document.getElementById('btnMinus');
const divideBtn = document.getElementById('btnDivide');
const timesBtn = document.getElementById('btnTimes');
const equalsBtn = document.getElementById('btnEqualsTo');
const negBtn = document.getElementById('btnNeg');
const percentBtn = document.getElementById('btnPercent');
const clearBtn = document.getElementById('btnClear');
const commaBtn = document.getElementById('btnComma');

let currentInput = '';
let previousInput = '';
let currentOperator = '';

const updateDisplay = (text) => {
  document.getElementById('display-container').innerHTML = `<p>${text}</p>`;
};

const handleNumber = (num) => {
  currentInput += num;
  updateDisplay(currentInput);
};

const handleOperator = (operator) => {
  if (currentInput === '') return;
  if (previousInput !== '') {
    calculate();
  }
  currentOperator = operator;
  previousInput = currentInput;
  currentInput = '';
};

const calculate = () => {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (currentOperator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  currentOperator = '';
  previousInput = '';
  updateDisplay(currentInput);
};

const clear = () => {
  currentInput = '';
  previousInput = '';
  currentOperator = '';
  updateDisplay('0');
};

[zeroBtn, oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, sixBtn, sevenBtn, eightBtn, nineBtn].forEach((btn, index) => {
  btn.addEventListener('click', () => handleNumber(index.toString()));
});

addBtn.addEventListener('click', () => handleOperator('+'));
minusBtn.addEventListener('click', () => handleOperator('-'));
timesBtn.addEventListener('click', () => handleOperator('*'));
divideBtn.addEventListener('click', () => handleOperator('/'));

equalsBtn.addEventListener('click', calculate);

clearBtn.addEventListener('click', clear);

negBtn.addEventListener('click', () => {
  if (currentInput) {
    currentInput = (-parseFloat(currentInput)).toString();
    updateDisplay(currentInput);
  }
});

percentBtn.addEventListener('click', () => {
  if (currentInput) {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay(currentInput);
  }
});

commaBtn.addEventListener('click', () => {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay(currentInput);
  }
});
