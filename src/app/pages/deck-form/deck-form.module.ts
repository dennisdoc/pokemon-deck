import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckFormComponent } from './deck-form.component';
import { SharedUIModule } from '../../shared/shared-ui.module';

@NgModule({
  declarations: [DeckFormComponent],
  imports: [
    CommonModule,
    SharedUIModule
  ]
})
export class DeckFormModule { }
