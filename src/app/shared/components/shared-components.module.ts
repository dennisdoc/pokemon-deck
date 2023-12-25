import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { SharedUIModule } from '../../shared/shared-ui.module';


@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    SharedUIModule
  ],
  exports: [
    CardComponent
  ]
})
export class SharedComponentsModule { }
