
// ======================== Variables and selectors ======================== 

const currentDisplay = document.querySelector("#currentNumber");
const previousDisplay = document.querySelector("#previousNumber");
const operationDisplay = document.querySelector("#operation");
const buttons = document.querySelectorAll("button");
const screen = document.querySelector("html");

let currentOperation = " ";
let currentNumber = 0;
let previousNumber = 0;
let dotFlag = false;
let zeros = 0;

// ======================== Display conversor function ======================== 
function convertToString(number) {
    number = number.toString()
    let decimal = number.split(".")[1]
    let integer = number.toString()
                        .split(".")
                        // Regex to split into sections of 3 for better readability
                        [0].match(/.{1,3}(?=(.{3})*$)/g)
                        .join(",");

    // Remove commas from in between minus and the number
    if(integer[0] == "-" && integer[1] == ",")
        integer = "-" + integer.slice(2);
    
    return decimal === undefined ? integer : integer.concat(".",decimal);
}

const toDisplay = function() {
    currentDisplay.innerText  = convertToString(currentNumber);
    if(dotFlag)
        currentDisplay.innerText += ".";
    for(let i=0;i<zeros;i++)
        currentDisplay.innerText += "0";
    if(previousNumber != 0)
        {
            previousDisplay.innerText = convertToString(previousNumber);
            operationDisplay.innerText = currentOperation;
        }
    else
    {
        previousDisplay.innerText = " ";
        operationDisplay.innerText = " ";
    }
}
toDisplay();

const resetVariables = function() {
    dotFlag = false;
    zeros = 0;
}

// ======================== Event handlers for buttons ======================== 
function numberPressedHandler(number) {
    let str = currentNumber.toString();
    // Not too big or too small numbers
    if(str.length > 12)
        return;
    if(currentNumber == 0)
        str = "";
    if(dotFlag) {
        str = str + ".";
        if(number != "0")
            dotFlag = false;
    }

    if(number == "0" && str.includes("."))
        zeros++;
    else {
        for(let i=0;i<zeros;i++)
            str += "0";
        zeros = 0;
        currentNumber = Number( str + number )
    }

    toDisplay();
}

const numberClickListener = function() {
    numberPressedHandler(this.getAttribute("data-number"));
}

const clearAllPressed = function() {
    currentNumber = 0;
    previousNumber = 0;
    currentOperation = ' ';
    zeros = 0;
    resetVariables();
    toDisplay();
}

const clearCurrentPressed = function() {
    currentNumber = 0;
    resetVariables();
    toDisplay();
}

const backSpacePressed = function() {
    // If there are any rightmost zeros, just decrements it
    if(zeros > 0)
        zeros--;
    else {
        // This deletes the rightmost number and counts how many rightmost zeros will be after its deletion
        let str = currentNumber.toString();
        
        currentNumber = Number( str.slice(0,-1) );

        if(dotFlag) {
            let i = str.length - 2;
            while( str[i] == 0) {
                zeros ++;
                i--;
            }
        }
    }
    if(currentNumber == 0 && zeros > 0)
        dotFlag = true;
        
    toDisplay();
}

// Simple operation handlers
const add = function() {
    currentNumber = previousNumber + currentNumber;
}

const multiply = function() {
    currentNumber = previousNumber * currentNumber;
}

const subtract = function() {
    currentNumber = previousNumber - currentNumber;
}

const divide = function() {
    currentNumber = previousNumber / currentNumber;
}

const operate = function(operation) {
    previousNumber = currentNumber;
    currentNumber = 0;
    currentOperation = operation;
    resetVariables();
    toDisplay();
}

const equalsPressed = function() {
    switch(currentOperation){
        case "+": add(); break;
        case "-": subtract(); break;
        case "*": multiply(); break;
        case "÷": divide(); break;
    }
    previousNumber=0;
    currentOperation=" ";
    toDisplay();
}

// Complex operation handlers (don't need to press equals)
const inverse = function() {
    currentNumber = 1 / currentNumber;
    toDisplay();
}

const percentage = function() {
    currentNumber *= 0.01 * previousNumber;
    toDisplay();
}

const square = function() {
    currentNumber*= currentNumber;
    toDisplay();
}

const sqrt = function() {
    currentNumber = Math.sqrt(currentNumber);
    toDisplay();
}

const invertValue = function() {
    currentNumber = -currentNumber;
    toDisplay();
}

const dot = function() {
    const str = currentNumber.toString();
    if(str.length > 12 || str.includes("."))
        return;
    dotFlag = true;
    toDisplay();
}

// ======================== Event listeners ======================== 
// Buttons
buttons.forEach( function(button) {
    if(button.hasAttribute("data-number"))
        button.addEventListener("click", numberClickListener);
    else switch(button.id) {
        case "clearAll" : button.addEventListener("click", clearAllPressed); break;
        case "clearCurrent" : button.addEventListener("click", clearCurrentPressed); break;
        case "backspace" : button.addEventListener("click", backSpacePressed); break;
        case "plus" : button.addEventListener("click", function() {operate("+")}); break;
        case "minus" : button.addEventListener("click", function() {operate("-")}); break;
        case "multiply" : button.addEventListener("click", function() {operate("*")}); break;
        case "divide" : button.addEventListener("click", function() {operate("÷")}); break;
        case "inverse": button.addEventListener("click", inverse); break;
        case "percentage": button.addEventListener("click", percentage); break;
        case "square": button.addEventListener("click", square); break;
        case "sqrt": button.addEventListener("click", sqrt); break;
        case "invertValue": button.addEventListener("click", invertValue); break;
        case "dot": button.addEventListener("click", dot); break;
        case "equals" : button.addEventListener("click", equalsPressed); break;
    }
});

// Keyboard
screen.addEventListener("keydown", function(e) {
    if(Number (e.key) >= 0 && Number (e.key) < 10)
        numberPressedHandler(e.key);

    else switch(e.key) {
        case "Escape":
        case "c": clearAllPressed(); break;
        case "e": clearCurrentPressed(); break;
        case "Backspace": backSpacePressed(); break;
        case "+": operate("+"); break;
        case "-": operate("-"); break;
        case "*": operate("*"); break;
        case "/": operate("÷"); break;
        case "%": percentage(); break;
        case "Enter":
        case "=": equalsPressed(); break;
        case ",":
        case ".": dot(); break;
    }
});