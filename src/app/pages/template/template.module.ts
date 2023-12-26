import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateComponent } from './template.component';
import { RouterModule } from '@angular/router';
import { 
	IgxIconModule,
	IgxNavbarModule,
  IgxNavigationDrawerModule,
  IgxSnackbarModule,
  IgxInputGroupModule, 
  IgxButtonModule,
  IgxRippleModule,
  IgxDialogModule,
  IgxTabsModule
 } from "igniteui-angular";
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';



@NgModule({
  declarations: [TemplateComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IgxIconModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxNavbarModule,
    IgxSnackbarModule,
    IgxInputGroupModule,
    SharedComponentsModule,
    IgxNavigationDrawerModule,
    IgxDialogModule,
    IgxTabsModule
  ],
})
export class TemplateModule { }
