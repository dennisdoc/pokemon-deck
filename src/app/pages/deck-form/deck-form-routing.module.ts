import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckFormModule } from './deck-form.module';
import { DeckFormComponent } from './deck-form.component';

const routes: Routes = [
  {path: '',component: DeckFormComponent}
];

@NgModule({
  imports: [DeckFormModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeckFormRoutingModule { }
