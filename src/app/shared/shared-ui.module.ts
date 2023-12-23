import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgxCardModule, IgxListModule } from 'igniteui-angular';



@NgModule({
  imports: [
    CommonModule,
    IgxListModule,
    IgxCardModule
  ],
  exports: [
    IgxListModule,
    IgxCardModule
  ]
})
export class SharedUIModule { }
