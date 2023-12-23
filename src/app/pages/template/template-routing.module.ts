import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template.component';
import { TemplateModule } from './template.module';
import { pagesRoutes } from '../pages.route';

const routes: Routes = [
  {path: '',component: TemplateComponent,children: pagesRoutes}
];

@NgModule({
  imports: [TemplateModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
