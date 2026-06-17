const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear-btn");
const digitBtns = document.querySelectorAll(".digit-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const equalBtn = document.querySelector(".equal-btn");
const backspaceBtn = document.querySelector(".backspace-btn");

let currentNumber = "";
let previousNumber = "";
let expression = "";
let operator = null;
const operatorSymbols = { "+": "+", "-": "-", "*": "×", "/": "÷" };
let justCalculated = false;

digitBtns.forEach((button) => {
  button.addEventListener("click", () => {
    let digit = button.textContent;
    expression += digit;
    handleDigit(digit);
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    let op = button.dataset.operator;
    expression += operatorSymbols[op];
    handleOperator(op);
  });
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
    currentNumber = "";
    justCalculated = false;
  }
  currentNumber += digit;
  updateDisplay();
}

function handleOperator(op) {
  if (currentNumber === "") {
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
        alert("Error, Cannot divide by 0");
        return "Error";
      }
      result = previousNumber / currentNumber;
      break;
  }

  return result;
}

function handleEquals() {
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
  expression = currentNumber.slice(0, -1);
  updateDisplay();
}
