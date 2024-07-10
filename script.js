const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentNumber = '';
let previousNumber = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', handleClick);
});

function handleNumber(value) {
    if (currentNumber.includes('.') && value === '.') return;
    currentNumber += value;
}

function clear() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
}

function changeSign() {
    if (currentNumber) {
        currentNumber = String(parseFloat(currentNumber) * -1);
    } else {
        currentNumber = '';
    }    
}

function handleOperator(value) {
    if (currentNumber === '' && value !== '-') return;
    if (previousNumber !== '') {
        calculate();
    }
    operator = value;
    previousNumber = currentNumber;
    currentNumber = '';
}

function calculate() {
    if (previousNumber === '' || currentNumber === '' || operator === '') return;

    const num1 = parseFloat(previousNumber);
    const num2 = parseFloat(currentNumber);
    let result;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case 'X':
            result = num1 * num2;
            break;
        case '/':
            result = num2 === 0 ? 'Error' : num1 / num2;
            break;
        case '%':
            result = num1 % num2;
            break;
        default:
            return;
    }

    currentNumber = result.toString();
    previousNumber = '';
    operator = '';
}

function updateDisplay() {
    display.textContent = currentNumber || previousNumber || '0';
}

function handleClick(event) {
    const value = event.target.textContent;

    if (!isNaN(value) || value === '.') {
        handleNumber(value);
    } else if (value === 'AC') {
        clear();
    } else if (value === '+/-') {
        changeSign();
    } else if (value === '=') {
        calculate();
    } else {
        handleOperator(value);
    }

    updateDisplay();
}

