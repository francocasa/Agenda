import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';



@NgModule({
  declarations: [
    ListasComponent
  ],
  exports:[
    ListasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
