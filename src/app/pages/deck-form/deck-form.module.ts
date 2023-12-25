import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckFormComponent } from './deck-form.component';
import { SharedUIModule } from '../../shared/shared-ui.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

@NgModule({
  declarations: [DeckFormComponent],
  imports: [
    CommonModule,
    SharedUIModule,
    SharedComponentsModule
  ]
})
export class DeckFormModule { }
