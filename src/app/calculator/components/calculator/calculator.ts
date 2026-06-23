import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';
import { CalculatorService } from '@/calculator/services/calculatorService';

@Component({
  selector: 'calculator',
  imports: [CalculatorButton],
  templateUrl: './calculator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator.css',
  host:{
    '(document:keyup)':" handleKeyBoardEvent($event)"
  }
})
export class Calculator {

  private calculatorService = inject(CalculatorService);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  public calculatorButtons = viewChildren(CalculatorButton);

  handleClick(key: string){
    this.calculatorService.constructNumber(key);
  }

  //@HostListener("document:keyup", ["$event"])
  handleKeyBoardEvent(event: KeyboardEvent){
    let key = event.key;
    const keyEquivalents: Record<string, string>={
      "*":"x",
      "/":"÷",
      "Enter":"=",
      "Escape":"C",
      "Delete":"C"
    };
    key = keyEquivalents[key] ?? key;

    this.calculatorButtons().forEach(button => {
      button.keyboardPressedStyle(key);
    });
    this.handleClick(key);
  }
}
