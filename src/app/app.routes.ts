import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:"calculator",
    //loadComponent: () => import("./calculator/views/calculator-view/calculator-view").then(c=> c.CalculatorView)
    loadComponent: () => import("@/calculator/views/calculator-view/calculator-view")
  },
{
  path:"**",
  redirectTo:"calculator"
}];
