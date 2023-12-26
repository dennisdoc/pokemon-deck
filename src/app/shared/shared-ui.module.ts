import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgxCardModule, IgxIconModule, IgxListModule, IgxPaginatorModule, IgxButtonModule,
	IgxRippleModule,
	IgxSnackbarModule, 
  IgxDialogModule} from 'igniteui-angular';



@NgModule({
  imports: [
    CommonModule,
    IgxListModule,
    IgxCardModule,
    IgxPaginatorModule,
    IgxIconModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxSnackbarModule,
    IgxDialogModule
  ],
  exports: [
    IgxListModule,
    IgxCardModule,
    IgxPaginatorModule,
    IgxIconModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxSnackbarModule,
    IgxDialogModule
  ]
})
export class SharedUIModule { }
