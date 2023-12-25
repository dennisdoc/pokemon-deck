import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../model/deck.model';

@Component({
  selector: 'deck-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  @Input() card!: Card;
  @Input() elevated = false;
  @Input('hide-actions') hideActions = false;
  @Output('image-loading') imageLoading = new EventEmitter<Card | null>();
  @Output('add-deck') addDeckAction = new EventEmitter<Card | null>();

  ngOnInit(): void {
    
  }

  finishedLoadingImage(): void {
    this.imageLoading.emit(this.card);
  }

  addToDeck(): void {
    this.addDeckAction.emit(this.card);
  }

}
