import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it("Should be 4", ()=>{
    //Arrange
    const num1 =

    //Act

    //Assert
    expect(2+2).toBe(4);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(app).toBeTruthy();
  });

  it('should render router-outlet', async () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector("router-outlet");
    expect(routerOutlet).toBeTruthy();

  });

  it('should render router-outlet with css classes', async () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const divElement = compiled.querySelector("div");
    const mustHaveClasses = "min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5".split(" ");

    //expect(divElement?.classList.value).toBe(mustHaveClasses);
divElement?.classList.forEach(className => expect(mustHaveClasses).toContain(className));



  });

});
