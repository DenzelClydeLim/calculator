const inputBtn = document.querySelector("#inputSect");
const displayInput = document.querySelector("#displayNum");
const operatorBtn = document.querySelector(".operator")
const operators = ["+", "-", "*", "/"];
let isHighlightOn = false;
let currentHighlightOp = "";
let first = 0;
let second = "";
let currentOperator = "";
let result = "";

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        case "%":
            return
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "No can do";
    }
    let value = (a / b);
    if (Number.isInteger(value)) {
        return a / b;
    }
    [valWhole, valSplit] = value.toString().split(".");
    let valLength = valSplit.length;
    if (valLength === 1) {
        return a / b;
    } else {
        return (a / b).toFixed(2);
    }
}

function getPercent(a) {
    return (a / 100);
}

inputBtn.addEventListener("click", (e) => {
    const target = e.target;
    const text = e.target.textContent;
    if (target.classList.value.includes("operator")) {
        if (currentOperator) {
            second = Number(displayInput.textContent);
            result = operate(currentOperator, first, second);
            currentOperator = "";
            displayInput.textContent = result;
        }
        target.classList.toggle("indivBtn");
        target.classList.toggle("highlightOperator");
        if (isHighlightOn && !(currentHighlightOp === target)) {
            currentHighlightOp.classList.toggle("indivBtn");
            currentHighlightOp.classList.toggle("highlightOperator");
        }
        if (target.classList.value.includes("highlightOperator")) {
            isHighlightOn = true;
            currentHighlightOp = target;
            currentOperator = text;
        } else {
            isHighlightOn = false;
            currentHighlightOp = "";
            currentOperator = "";
        }
    } else if (text === "=") {
        if (currentOperator) {
            second = Number(displayInput.textContent);
            result = operate(currentOperator, first, second);
            currentOperator = "";
            displayInput.textContent = result;
        }
    } else if (text === ".") {
        if (!displayInput.textContent.includes(".")) {
            displayInput.textContent += text;
        }
    } else if (text === "%") {
        displayInput.textContent = getPercent(Number(displayInput.textContent))
    } else if (text === "C") {
        displayInput.textContent = displayInput.textContent.slice(0, displayInput.textContent.length - 1);
        if (displayInput.textContent.length === 0) {
            displayInput.textContent = 0;
        }
    }
    else if (text === "+/-") {
        if (!displayInput.textContent.includes("-")) {
            displayInput.textContent = "-" + displayInput.textContent;
        } else {
            displayInput.textContent = displayInput.textContent.slice(1);
        }
    } else if (text === "CLR") {
        displayInput.textContent = "0";
        result = "";
        if (isHighlightOn) {
            currentHighlightOp.classList.toggle("highlightOperator"); currentHighlightOp.classList.toggle("indivBtn");
            currentHighlightOp = "";
        }
        isHighlightOn = false;
        currentOperator = "";
        first = "";
        second = "";
        result = "";
    }
    else {
        if (isHighlightOn) {
            isHighlightOn = false;
            first = Number(displayInput.textContent);
            displayInput.textContent = "0";
            currentHighlightOp.classList.toggle("highlightOperator");
            currentHighlightOp.classList.toggle("indivBtn");
            currentHighlightOp = "";
        }
        if (displayInput.textContent === "0") {
            displayInput.textContent = "";
        }
        if (result) {
            result = "";
            displayInput.textContent = "";
        }
        displayInput.textContent += text;
    }
})
