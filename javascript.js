const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const OPERANDS = ["÷", "×", "-", "+", "="];
const SPECIAL_KEYS = ["AC", "C", "⁺∕₋", "%"];

class Calculator {
  constructor() {
    this.savedValue = "";
    this.savedOperand = "";
    this.display = document.querySelector("#display");
    this.clearButton = document.querySelector("#clearButton");
  }

  checkCommand(command) {
    command = command.trim();
    if (DIGITS.includes(command))
      this.appendToDisplay(command);
    else if (OPERANDS.includes(command))
      this.doOperation(command);
    else if (SPECIAL_KEYS.includes(command))
      this.doSpecialStuff(command);
    else
      return 0;
  }

  appendToDisplay(command) {
    if (this.savedValue === "" && this.savedOperand != "") {
      this.savedValue = this.display.textContent;
      this.display.textContent = command;
    }
    else if ((this.display.textContent === "0" || this.display.textContent === "ERROR") && (command != "." || command === "0")) {
      this.display.textContent = command;
      this.clearButton.textContent = "C";
    }
    else if (this.display.textContent === "-0" && (command != "." || command === "0")) {
      this.display.textContent = "-" + command;
      this.clearButton.textContent = "C";
    }
    else this.display.textContent += command;
  }

  doOperation(command) {
    if (this.savedValue != "" && this.savedOperand != "") {
      switch (this.savedOperand) {
        case "÷": this.display.textContent = divide(this.savedValue, this.display.textContent);
          break;

        case "×": this.display.textContent = multiply(this.savedValue, this.display.textContent);
          break;

        case "-": this.display.textContent = subtract(this.savedValue, this.display.textContent);
          break;

        case "+": this.display.textContent = add(this.savedValue, this.display.textContent);
          break;
      }
    }
    this.savedValue = "";
    if (command === "=")
      this.savedOperand = "";
    else
      this.savedOperand = command;
  }

  doSpecialStuff(command) {
    switch (command) {
      case "AC": this.reset();
        break;
      case "C": this.clearView();
        break;
      case "⁺∕₋": this.toggleSign();
        break;
      case "%": this.display.textContent = divide(this.display.textContent, "100");
        break;
    }
  }

  reset() {
    this.savedValue = "";
    this.savedOperand = "";
    this.display.textContent = "0";
  }

  clearView() {
    this.display.textContent = "0";
    this.clearButton.textContent = "AC";
  }

  toggleSign() {
    if (this.display.textContent.includes("-"))
      this.display.textContent = this.display.textContent.substring(1);
    else
      this.display.textContent = "-" + this.display.textContent;
  }

}

function add(number1String, number2String) {
  number1 = parseFloat(number1String);
  number2 = parseFloat(number2String);
  return (number1 + number2);
}

function subtract(number1String, number2String) {
  number1 = parseFloat(number1String);
  number2 = parseFloat(number2String);
  return (number1 - number2);
}

function multiply(number1String, number2String) {
  number1 = parseFloat(number1String);
  number2 = parseFloat(number2String);
  return (Math.round(number1 * number2 * 100)) / 100;
}

function divide(number1String, number2String) {
  number1 = parseFloat(number1String);
  number2 = parseFloat(number2String);
  if (number2 == 0)
    return "ERROR";
  return (Math.round(number1 / number2 * 100)) / 100;
}

function main() {
  let myCalculator = new Calculator();
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      myCalculator.checkCommand(button.textContent);
    })
  });
}

main();