import { Injectable, signal } from '@angular/core';

const numbers = ["0","1","2","3","4","5","6","7","8","9"];
const operators = ["÷","x","-","+"];
const specialOperators = ["C", "+/-","%",".","=", "Backspace"];


@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal("0");
  public subResultText = signal("0");
  public lastOperator = signal("");

  public constructNumber(value: string): void{

    if(![...numbers, ...operators, ...specialOperators].includes(value)){
      console.log("Invalid input", value);
      return;
    }

    if(value ==="="){
      this.calculateResult();
      return;
    }

    if(value ==="C"){
      this.resultText.set("0");
      this.subResultText.set("0");
      this.lastOperator.set("");
      return;
    }

    if(value ==="Backspace"){
      if(this.resultText() === "0"){
        this.lastOperator.set("");
      } else if(this.resultText().length <= 1){
        this.lastOperator.set("");
        this.resultText.set("0");
      }else{
        this.resultText.update(prev => prev.slice(0, -1));
      }

      return;
    }

    if(operators.includes(value) || value === "%"){
      this.calculateResult();
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set("0");
      return;
    }

    if(this.resultText().length >= 10){
      return;
    }

    if(value === "." && !this.resultText().includes(".")){
      this.resultText.update(prev => prev + ".");
      return;
    }

    if(value === "+/-"){
      if(this.resultText().includes("-")){
        this.resultText.update(prev => prev.slice(1));
      }else{
        this.resultText.update(prev => "-" + prev);
      }
      return;
    }

    if(this.resultText() === "0" || this.resultText() === "-0"){
      this.resultText.set(value);
    }else{
      this.resultText.update(prev => prev + value);
    }
  }

  public calculateResult(){
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());
    let result= 0;

    if(number1 === 0){
      return;
    }

    switch(this.lastOperator()){
      case "+":
        result = number1 + number2;
        break;

      case "-":
        result = number1 - number2;
        break;

      case "x":
        result = number1 * number2;
        break;

      case "÷":
        result = number1/number2;
        break;
      case "%":
        result = number1*(number2/100);
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set("0");
    this.lastOperator.set("");
  }


}
