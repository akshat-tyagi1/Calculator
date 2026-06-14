const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear-btn");
const divideBtn = document.querySelector(".divide-btn");
const multiplyBtn = document.querySelector(".multiplication-btn");
const subtractBtn = document.querySelector(".subtract-btn");
const additionBtn = document.querySelector(".addition-btn");
const digitBtns = document.querySelectorAll(".digit-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const equalBtn = document.querySelector(".equal-btn");
const backspaceBtn = document.querySelector(".backspace-btn");

let result = 0;

let opArr = ["+", "-", "×", "÷"];
digitBtns.forEach((digitBtn) => {
  digitBtn.addEventListener("click", () => {
    let num1 = digitBtn.textContent;
    if (display.textContent === "0") {
      display.textContent = "";
    }
    display.textContent += num1;
    num1 = Number(num1);
  });
});

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    let str = display.textContent;
    if (opArr.includes(str[str.length - 1])) {
      return;
    }
    let operator = operatorBtn.textContent;
    if (display.textContent === "0" && operator === "-") {
      return (display.textContent = operator);
    }
    doCalculation(str);
    display.textContent += operator;
  });
});

function doCalculation(str) {
  if (opArr.some((op) => str.includes(op))) {
    const op = opArr.find((operator) => str.includes(operator));
    let opIndex = str.indexOf(op);
    let num1 = Number(str.slice(0, opIndex));
    let num2 = Number(str.slice(opIndex + 1, str.length));
    if (op === "+") {
      result = addition(num1, num2);
    } else if (op === "-") {
      result = subtraction(num1, num2);
    } else if (op === "×") {
      result = multiplication(num1, num2);
    } else if (op === "÷") {
      result = divide(num1, num2);
    }
    display.textContent = result;
  }
}

equalBtn.addEventListener("click", () => {
  let str = display.textContent;
  doCalculation(str);
});

clearBtn.addEventListener("click", () => {
  display.textContent = "0";
});

backspaceBtn.addEventListener("click", () => {
  if (display.textContent.length === 1 || display.textContent.length === 0) {
    return (display.textContent = "0");
  }
  display.textContent = display.textContent.slice(0, -1);
});

function addition(num1, num2) {
  return num1 + num2;
}

function subtraction(num1, num2) {
  return num1 - num2;
}

function multiplication(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}
