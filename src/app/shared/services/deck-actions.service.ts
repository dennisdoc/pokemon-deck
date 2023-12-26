import { Injectable } from '@angular/core';
import { DeckUser } from '../model/deck.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { DECK_LIST_SAVED } from '../const/storage.const';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DeckActionsService {
  private peekDeck = new BehaviorSubject<boolean>(false);
  private deckList = new BehaviorSubject<DeckUser | null>(null);

  constructor(private storage: StorageService) { }

  changeDeck(deck: DeckUser, save = false): void {
    if(!deck){
      this.deckList.next(null);
      return ;
    }
    if(!this.storage.getItem(DECK_LIST_SAVED) && save){
      deck.id = uuid.v4();
      this.storage.setItem(DECK_LIST_SAVED,JSON.stringify([deck]));
    }else{
      const deckList: Array<DeckUser> = this.storage.getItem(DECK_LIST_SAVED);
      if(!deck.id){
        deck.id = uuid.v4();
        deckList.push(deck);
        if(save) this.storage.setItem(DECK_LIST_SAVED,JSON.stringify(deckList));
        return ;
      }
      const index = deckList.findIndex(deckItem=>(deckItem.id === deck.id));
      if(index >=0){
        deckList[index] = deck;
      }else{
        deckList.push(deck);
      }
      if(save) this.storage.setItem(DECK_LIST_SAVED,JSON.stringify(deckList));
    }
    this.deckList.next(deck);
  }

  peek(): void{
    this.peekDeck.next(true);
  }

  close(): void{
    this.peekDeck.next(false);
  }

  listenToPeek(): Observable<boolean>{
    return this.peekDeck;
  }

  listenToDeck(): Observable<DeckUser | null>{
    return this.deckList;
  }

  removeDeck(deck: DeckUser): void{
    let deckList: Array<DeckUser> = this.storage.getItem(DECK_LIST_SAVED);
    if(deckList){
      const index = deckList.findIndex(deckItem=>(deckItem.id === deck.id));
      if(index >=0){
        deckList = deckList.splice(index,1);
        this.storage.setItem(DECK_LIST_SAVED,JSON.stringify(deckList));
      }
    }
  }

}
