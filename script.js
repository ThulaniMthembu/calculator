// Select elements
const screen = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Update display
function updateDisplay() {
	screen.value = screen.value || '0';
}

// Handle digit input
function inputDigit(digit) {
	if (waitingForSecondOperand) {
		screen.value = digit;
		waitingForSecondOperand = false;
	} else {
		screen.value = screen.value === '0' ? digit : screen.value + digit;
	}
}

// Handle decimal point
function inputDecimal() {
	if (waitingForSecondOperand) {
		screen.value = '0.';
		waitingForSecondOperand = false;
		return;
	}

	if (!screen.value.includes('.')) {
		screen.value += '.';
	}
}

// Handle operators
function handleOperator(nextOperator) {
	const inputValue = parseFloat(screen.value);

	if (operator && waitingForSecondOperand) {
		operator = nextOperator;
		screen.value = `${firstOperand} ${operator}`;
		return;
	}

	if (firstOperand === null && !isNaN(inputValue)) {
		firstOperand = inputValue;
	} else if (operator) {
		const result = calculate(firstOperand, inputValue, operator);
		screen.value = `${parseFloat(result.toFixed(7))}`;
		firstOperand = result;
	}

	if (nextOperator === '=') {
		operator = null;
		waitingForSecondOperand = false;
		firstOperand = null;
	} else {
		waitingForSecondOperand = true;
		operator = nextOperator;
		screen.value = `${firstOperand} ${operator}`;
	}
}

// Perform calculation
function calculate(first, second, op) {
	switch (op) {
		case '+':
			return first + second;
		case '-':
			return first - second;
		case '*':
			return first * second;
		case '/':
			return second !== 0 ? first / second : 'Error';
		case '%':
			return (first / 100) * second;
		default:
			return second;
	}
}

// Clear calculator
function resetCalculator() {
	screen.value = '0';
	firstOperand = null;
	operator = null;
	waitingForSecondOperand = false;
}

// Handle backspace
function handleBackspace() {
	if (waitingForSecondOperand) {
		return;
	}
	screen.value = screen.value.slice(0, -1) || '0';
}

// Handle percentage
function handlePercentage() {
	const currentValue = parseFloat(screen.value);
	if (!isNaN(currentValue)) {
		screen.value = currentValue / 100;
	}
}

// Handle negative toggle
function handleNegative() {
	const currentValue = parseFloat(screen.value);
	if (!isNaN(currentValue)) {
		screen.value = -currentValue;
	}
}

// Event listener using event delegation
keys.addEventListener('click', (event) => {
	const { target } = event;
	if (!target.matches('button')) {
		return;
	}

	if (target.classList.contains('operator')) {
		handleOperator(target.value);
		updateDisplay();
		return;
	}

	if (target.classList.contains('decimal')) {
		inputDecimal();
		updateDisplay();
		return;
	}

	if (target.classList.contains('clear')) {
		resetCalculator();
		updateDisplay();
		return;
	}

	if (target.classList.contains('equal-sign')) {
		handleOperator('=');
		updateDisplay();
		return;
	}

	if (target.classList.contains('back')) {
		handleBackspace();
		updateDisplay();
		return;
	}

	if (target.classList.contains('percent')) {
		handlePercentage();
		updateDisplay();
		return;
	}

	if (target.classList.contains('negative')) {
		handleNegative();
		updateDisplay();
		return;
	}

	inputDigit(target.value);
	updateDisplay();
});

// Initial display update
updateDisplay();
