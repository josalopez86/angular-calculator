import { Injectable, signal } from '@angular/core';

const numbers = ["0","1","2","3","4","5","6","7","8","9"];
const operators = ["/","*","-","+"];
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
      } else if(this.resultText().length <= 1){
        this.resultText.set("0");
      }else{
        this.resultText.update(prev => prev.slice(0, -1));
      }

      return;
    }

    if(operators.includes(value)){
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
}
