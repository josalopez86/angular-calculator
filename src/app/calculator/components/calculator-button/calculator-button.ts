import { booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, OnInit, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl:"./calculator-button.css",
  host:{
    class:"border-r border-b border-indigo-400",
    "[class.w-2/4]":"isDoubleSize()",
    "[class.w-1/4]":"!isDoubleSize()",
  }
})
export class CalculatorButton {

  public isPressed = signal(false);
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>("button");
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

  // @HostBinding("class.is-command") get commandStyle(){
  //   return this.isCommand();
  // }

  // @HostBinding("class.w-2/4") get doubleSizeStyle(){
  //   return this.isDoubleSize();
  // }

  public handleClick(){
    if(!this.contentValue()?.nativeElement){
      return
    }
    this.onClick.emit(this.contentValue()!.nativeElement.innerText.trim());
  }

  public keyboardPressedStyle(key: string){
    if(!this.contentValue){
      return;
    }
    const value = this.contentValue()!.nativeElement.innerText.trim();

    if(value !== key){
      return;
    }
    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);


  }

}
