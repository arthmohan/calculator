const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output');

let input = "";

for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if (value === "clear") {
            input = "";
            displayInput.innerHTML = "";
            displayOutput.innerHTML = "";
        } else if (value === "backspace") {
            input = input.slice(0, -1);
            displayInput.innerHTML = cleanInput(input);
        } else if (value === "=") {
            try {
                let result = eval(input);
                if (isNaN(result) || !isFinite(result)) {
                    throw new Error("");
                }
                displayOutput.innerHTML = cleanOutput(result);
            } catch (error) {
                displayOutput.innerHTML = "Error " + error.message;
            }
        } else if (value === "brackets") {
            if (input.indexOf("(") === -1 ||
                (input.indexOf("(") !== -1 &&
                    input.indexOf(")") !== -1 &&
                    input.lastIndexOf("(") > input.lastIndexOf(")")
                )
            ) {
                input += "(";
            } else if (input.indexOf("(") !== -1 &&
                (input.indexOf(")") === -1 ||
                    input.indexOf("(") !== -1 &&
                    input.indexOf(")") !== -1 &&
                    input.lastIndexOf("(") < input.lastIndexOf(")")
                )
            ) {
                input += ")";
            }

            displayInput.innerHTML = cleanInput(input);
        } else {
            if(validateInput(value)){
                input += value;
                displayInput.innerHTML = cleanInput(input);
            }
        }
    });
}

function cleanInput(input) {
    let inputArray = input.split("");
    let cleanedInput = "";

    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] === "*") {
            cleanedInput += ` <span class="operator">x</span> `;
        } else if (inputArray[i] === "/") {
            cleanedInput += ` <span class="operator">÷</span> `;
        } else if (inputArray[i] === "+") {
            cleanedInput += ` <span class="operator">+</span> `;
        } else if (inputArray[i] === "-") {
            cleanedInput += ` <span class="operator">-</span> `;
        } else if (inputArray[i] === "(") {
            cleanedInput += `<span class="brackets">(</span>`;
        } else if (inputArray[i] === ")") {
            cleanedInput += `<span class="brackets">)</span>`;
        } else if (inputArray[i] === "%") {
            cleanedInput += ` <span class="percent">%</span> `;
        } else {
            cleanedInput += inputArray[i];
        }
    }

    return cleanedInput;
}

function cleanOutput(result) {
    let outputString = result.toString();
    let decimal = outputString.split(".")[1];
    outputString = outputString.split(".")[0];
    let outputArray = outputString.split("");

    if (outputArray.length > 3) {
        for (let i = outputArray.length - 3; i > 0; i -= 3) {
            outputArray.splice(i, 0, ",");
        }
    }

    if (decimal) {
        outputArray.push(".");
        outputArray.push(decimal);
    }

    return outputArray.join("");
}

function validateInput(value) {
    let lastInput = input.slice(-1);
    let operators = ["+", "-", "/", "*", "%"];
    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    // Check for consecutive decimals and operators
    if (value === "." && (lastInput === "." || operators.includes(lastInput))) {
        return false;
    }

    // Check for consecutive digits after a decimal point
    if (lastInput === "." && numbers.includes(value)) {
        return true;
    }


    // Check for consecutive operators
    if (operators.includes(value) && operators.includes(lastInput)) {
        return false;
    }

    return true;
}
 



