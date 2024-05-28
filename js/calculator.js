
let currentOperation;
let currentNumber=0;
let previousNumber;

const add = function() {
    return previousNumber + currentNumber;
}

const multiply = function() {
    return previousNumber * currentNumber;
}

const subtract = function() {
    return previousNumber - currentNumber;
}

const divide = function() {
    return previousNumber / currentNumber;
}