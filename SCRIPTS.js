let display = document.getElementById('display');
let hasDecimal = false;
let lastKeyWasOperator = false;

function clearDisplay() {
    display.innerText = '0';
    hasDecimal = false;
    lastKeyWasOperator = false;
}

function appendToDisplay(value) {
    if (value === '.' && hasDecimal) return;

    if (lastKeyWasOperator && ['+', '-', '*', '/'].includes(value)) {
        display.innerText = display.innerText.slice(0, -1) + value;
    } else {
        if (display.innerText === '0' && value !== '.') {
            display.innerText = value;
        } else {
            display.innerText += value;
        }
    }

    lastKeyWasOperator = ['+', '-', '*', '/'].includes(value);
    if (value === '.') {
        hasDecimal = true;
    }
}

function calculateResult() {
    try {
        let result = eval(display.innerText);

        if (result === Infinity || result === -Infinity || isNaN(result)) {
            display.innerText = 'Error';
        } else {
            display.innerText = result;
        }

        hasDecimal = display.innerText.includes('.');
        lastKeyWasOperator = false;
    } catch (e) {
        display.innerText = 'Error';
    }
}

function handleKeyboardInput(event) {
    const key = event.key;

    if (/\d/.test(key)) {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
        hasDecimal = false;
    } else if (key === '.') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        let newDisplay = display.innerText.slice(0, -1);
        display.innerText = newDisplay || '0';
        hasDecimal = display.innerText.includes('.');
    } else if (key === 'Escape') {
        clearDisplay();
    }
}

document.addEventListener('keydown', handleKeyboardInput);
