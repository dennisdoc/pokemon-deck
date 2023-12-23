import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateComponent } from './template.component';
import { RouterModule } from '@angular/router';
import { 
	IgxIconModule,
	IgxNavbarModule
 } from "igniteui-angular";


@NgModule({
  declarations: [TemplateComponent],
  imports: [
    CommonModule,
    RouterModule,
    IgxIconModule,
    IgxNavbarModule
  ],
})
export class TemplateModule { }
