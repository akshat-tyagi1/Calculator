const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear-btn");
const digitBtns = document.querySelectorAll(".digit-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const equalBtn = document.querySelector(".equal-btn");
const backspaceBtn = document.querySelector(".backspace-btn");
const decimalBtn = document.querySelector(".decimal-btn");
const percentBtn = document.querySelector(".percent-btn");

let currentNumber = "";
let previousNumber = "";
let expression = "";
let operator = null;
const operatorSymbols = { "+": "+", "-": "-", "*": "×", "/": "÷" };
let justCalculated = false;

digitBtns.forEach((button) => {
  button.addEventListener("click", () => {
    let digit = button.textContent;
    handleDigit(digit);
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    let op = button.dataset.operator;
    handleOperator(op);
  });
});

decimalBtn.addEventListener("click", () => {
  handleDecimal();
});

percentBtn.addEventListener("click", () => {
  handlePercent();
});

equalBtn.addEventListener("click", () => {
  handleEquals();
});

clearBtn.addEventListener("click", () => {
  handleClear();
});

backspaceBtn.addEventListener("click", () => {
  handleBackspace();
});

function updateDisplay() {
  display.textContent = expression || "0";
}

function handleDigit(digit) {
  if (justCalculated) {
    expression = "";
    currentNumber = "";
    justCalculated = false;
  }
  currentNumber += digit;
  expression += digit;
  updateDisplay();
}

function handleOperator(op) {
  if (expression === "") {
    if (op === "-") {
      expression += operatorSymbols[op];
      currentNumber += operatorSymbols[op];
      updateDisplay();
      return;
    }
    return;
  }

  if (currentNumber === "") {
    if (operator === "*" || operator === "/") {
      if (op === "-") {
        expression += operatorSymbols[op];
        currentNumber += operatorSymbols[op];
        updateDisplay();
        return
      }
    }
    if (operator !== null) {
      expression = expression.slice(0, -1) + operatorSymbols[op];
      operator = op;
      updateDisplay()
      return;
    }
  } else if (currentNumber === "-") {
    expression = expression.slice(0, -2) + operatorSymbols[op];
    currentNumber = "";
    operator = op;
    updateDisplay();
    return;
  }

  if (operator !== null) {
    previousNumber = doCalculation(previousNumber, currentNumber, operator);
    if (previousNumber === "Error") {
      display.textContent = previousNumber;
      previousNumber = "";
      currentNumber = "";
      operator = null;
      return;
    }
    currentNumber = "";
  } else {
    previousNumber = currentNumber;
    currentNumber = "";
  }

  operator = op;
  expression += operatorSymbols[operator];
  updateDisplay();
}

function doCalculation(previousNumber, currentNumber, operator) {
  let result = 0;
  previousNumber = Number(previousNumber);
  currentNumber = Number(currentNumber);

  switch (operator) {
    case "+":
      result = previousNumber + currentNumber;
      break;

    case "-":
      result = previousNumber - currentNumber;
      break;

    case "*":
      result = previousNumber * currentNumber;
      break;

    case "/":
      if (currentNumber === 0) {
        return "Error";
      }
      result = previousNumber / currentNumber;
      break;
  }

  return result;
}

function handleEquals() {
  if (operator === null) {
    expression = String(currentNumber);
    updateDisplay();
    return;
  }
  currentNumber = doCalculation(previousNumber, currentNumber, operator);

  if (currentNumber === "Error") {
    display.textContent = currentNumber;
    previousNumber = "";
    currentNumber = "";
    operator = null;
    return;
  }

  expression = String(currentNumber);
  justCalculated = true;
  previousNumber = "";
  operator = null;
  updateDisplay();
}

function handleClear() {
  currentNumber = "";
  previousNumber = "";
  operator = null;
  justCalculated = false;
  expression = "";
  updateDisplay();
}

function handleBackspace() {
  if (currentNumber === "" && operator !== null) {
    operator = null
  }
  expression = expression.slice(0, -1);
  updateDisplay();
}

function handleDecimal() {
  if (justCalculated) {
    expression = "";
    currentNumber = "";
    justCalculated = false;
  }
  if (currentNumber.includes(".")) {
    return;
  }
  currentNumber += ".";
  expression += ".";
  updateDisplay();
}

function handlePercent() {
  currentNumber = Number(currentNumber);
  expression += "%";

  if (previousNumber === "") {
    currentNumber = currentNumber / 100;
  } else {
    currentNumber = previousNumber * (currentNumber / 100);
  }

  currentNumber = String(currentNumber);
  updateDisplay();
}

// Keyboard events

document.addEventListener("keydown", (event) => {
  const digitArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operatorArr = ["+", "-", "*", "/"];

  if (digitArr.includes(event.key)) {
    handleDigit(event.key);
  } else if (event.key === ".") {
    handleDecimal();
  } else if (operatorArr.includes(event.key)) {
    handleOperator(event.key);
  } else if (event.key === "Enter") {
    handleEquals();
  } else if (event.key === "Backspace") {
    handleBackspace();
  } else if (event.key === "c") {
    handleClear();
  }
});
