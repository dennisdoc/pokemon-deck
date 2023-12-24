import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgxCardModule, IgxIconModule, IgxListModule, IgxPaginatorModule } from 'igniteui-angular';



@NgModule({
  imports: [
    CommonModule,
    IgxListModule,
    IgxCardModule,
    IgxPaginatorModule,
    IgxIconModule
  ],
  exports: [
    IgxListModule,
    IgxCardModule,
    IgxPaginatorModule,
    IgxIconModule
  ]
})
export class SharedUIModule { }
