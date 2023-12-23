import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../shared/services/deck.service';
import { Deck } from '../../shared/model/deck.model';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrl: './deck-form.component.scss'
})
export class DeckFormComponent implements OnInit{
  cardList: Deck[] | null = null;

  constructor(private service: DeckService){}

  ngOnInit(): void {
    this.service.getAllCards().subscribe(
      (cards)=>{
        this.cardList = cards.data;
      }
    )
  }

}
