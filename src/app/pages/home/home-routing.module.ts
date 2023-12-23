import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home.module';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path: '',component: HomeComponent}
];

@NgModule({
  imports: [HomeModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
