import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {AnimalComponent} from "./animal/animal.component";
import {FormComponent} from "./form/form.component";

const routes: Routes = [
  {
    path: '', component: NavbarComponent
  },
  {
    path: 'animal', component: AnimalComponent
  },
  {
    path: 'form/:id', component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
