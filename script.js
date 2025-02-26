document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById('inputBox');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let prevInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            handleInput(e.target.textContent);
        });
    });

    document.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key === 'Backspace') {
            handleInput('Del');
        } else if (key === 'Enter') {
            handleInput('=');
        } else if (key === 'Escape') {
            handleInput('AC');
        } else if ('0123456789'.includes(key)) {
            handleInput(key);
        } else if ('+-*/%.'.includes(key)) {
            handleInput(key);
        }
    });

    function handleInput(input) {
        if (input === 'AC') {
            currentInput = '';
            prevInput = '';
            operator = '';
            inputBox.value = '0';
        } else if (input === 'Del') {
            currentInput = currentInput.slice(0, -1);
            inputBox.value = currentInput || '0';
        } else if ('%/*-+'.includes(input)) {
            if (currentInput !== '') {
                prevInput = currentInput;
                currentInput = '';
            }
            operator = input;
        } else if (input === '=') {
            if (prevInput !== '' && currentInput !== '') {
                let result;
                const prev = parseFloat(prevInput);
                const current = parseFloat(currentInput);

                switch (operator) {
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
                    case '%':
                        result = prev % current;
                        break;
                    default:
                        return;
                }

                inputBox.value = result;
                currentInput = result.toString();
                prevInput = '';
                operator = '';
            }
        } else if (input === '.') {
            if (!currentInput.includes('.')) {
                currentInput += input;
                inputBox.value = currentInput;
            }
        } else if ('0123456789'.includes(input)) {
            if (currentInput === '0') {
                currentInput = input;
            } else {
                currentInput += input;
            }
            inputBox.value = currentInput;
        }
    }
});
