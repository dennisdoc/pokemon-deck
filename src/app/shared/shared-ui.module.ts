import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgxCardModule, IgxIconModule, IgxListModule, IgxPaginatorModule, IgxButtonModule,
	IgxRippleModule,
	IgxSnackbarModule } from 'igniteui-angular';



@NgModule({
  imports: [
    CommonModule,
    IgxListModule,
    IgxCardModule,
    IgxPaginatorModule,
    IgxIconModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxSnackbarModule
  ],
  exports: [
    IgxListModule,
    IgxCardModule,
    IgxPaginatorModule,
    IgxIconModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxSnackbarModule
  ]
})
export class SharedUIModule { }
