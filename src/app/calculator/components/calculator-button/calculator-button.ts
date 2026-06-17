import { booleanAttribute, ChangeDetectionStrategy, Component, HostBinding, input, OnInit } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl:"./calculator-button.css",
  host:{
    class:"w-1/4 border-r border-b border-indigo-400"
  }
})
export class CalculatorButton {
  public isCommand = input(false, {
    //  transform: (value: boolean | string) => {
    //   return typeof value === 'string'
    //   ? value === 'true'
    //   : value;
    // }
    transform: booleanAttribute
  });

  public isDoubleSize = input(false, {
    transform: booleanAttribute
  });

  @HostBinding("class.is-command") get commandStyle(){
    return this.isCommand();
  }

  @HostBinding("class.w-2/4") get doubleSizeStyle(){
    return this.isDoubleSize();
  }

}
