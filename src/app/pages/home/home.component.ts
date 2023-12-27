import { Component, OnInit } from '@angular/core';
import { DeckUser } from '../../shared/model/deck.model';
import { DeckService } from '../../shared/services/deck.service';
import { DeckActionsService } from '../../shared/services/deck-actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  deckList!: Array<DeckUser> | null;

  constructor(
    private deckService: DeckService,
    private deckActionService: DeckActionsService,
    private router: Router
    ){}

  ngOnInit(): void {
    const list = this.deckService.getDecksSaved();
    if(list?.length){
      this.deckList = list.filter(item=>(item.name));
    }
    
  }

  addDeck(): void {
    this.deckActionService.changeDeck({
      id: null,
      name: null,
      cards: [],
      cardMap: {}
    });
    this.router.navigate(['/deck/add']);
  }

  showDeck(deck: DeckUser){
    this.deckActionService.changeDeck(deck);
    this.deckActionService.peek();
  }

  editDeck(deck: DeckUser){
    this.deckActionService.changeDeck(deck);
    this.router.navigate([`/deck/edit/${deck.id}`]);
  }

  removeDeck(deck: DeckUser, index: number){
    this.deckActionService.removeDeck(deck);
    this.deckList?.splice(index,1);
  }

}
