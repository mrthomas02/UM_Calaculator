const buttons = document.querySelectorAll('button');
const display = document.getElementById('calc-display');
let currentInput = '';
let operator = null;
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Clear everything
        if (button.classList.contains('clear')) {
            currentInput = '';
            operator = null;
            previousInput = '';
            display.value = '';
        }
        // Equals button
        else if (value === '=') {
            if (operator && previousInput !== '' && currentInput !== '') {
                currentInput = calculate(previousInput, currentInput, operator);
                display.value = currentInput;
                operator = null;
                previousInput = '';
            }
        }
        // Operators (+, -, *, /)
        else if (['+', '-', '*', '/'].includes(value)) {
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        }
        // Handle other button inputs (numbers, decimal)
        else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});

// Square root functionality
document.querySelector('.sqrt').addEventListener('click', () => {
    if (currentInput !== '') {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        display.value = currentInput;
    }
});

// Percentage functionality
document.querySelector('.percent').addEventListener('click', () => {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        display.value = currentInput;
    }
});

// Backspace functionality
document.querySelector('.backspace').addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
});

// Calculate result
function calculate(num1, num2, operator) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    switch (operator) {
        case '+': return (a + b).toString();
        case '-': return (a - b).toString();
        case '*': return (a * b).toString();
        case '/': return (b === 0 ? 'Error' : (a / b).toString());
    }
}