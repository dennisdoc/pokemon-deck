import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../shared/services/deck.service';
import { Card, DeckUser } from '../../shared/model/deck.model';
import { Subscription, finalize } from 'rxjs';
import { TemplateNotificationService } from '../../shared/services/template-notification.service';
import { DeckActionsService } from '../../shared/services/deck-actions.service';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrl: './deck-form.component.scss'
})
export class DeckFormComponent implements OnInit{
  deckListFull: Card[] | null = null;
  deckList: Card[] | null = null;
  pagination = {
    size: 16,
    totalRecords: 10,
    loading: false
  }
  deck: DeckUser = {
    id: null,
    name: null,
    cards: [],
    cardMap: {}
  }
  searchSub: Subscription | null = null;
  peakDeckAction = false;

  constructor(
    private service: DeckService,
    private deckAction: DeckActionsService,
    private notificationService: TemplateNotificationService
    ){}

  ngOnInit(): void {
    this.deckAction.listenToDeck().subscribe(deckUser=>{
      if(!deckUser) return ;
      this.deck = deckUser;
    });
    this.pageChange();
  }

  pageChange(index = 0): void{
    
    this.pagination.loading = true;
    setTimeout(()=>{
      console.info('pageChange',index);
      if(this.searchSub){
        this.searchSub.unsubscribe();
      }
      this.searchSub = this.service.getAllCards(index,this.pagination.size).pipe(finalize(()=>{
        this.pagination.loading = false;
        this.searchSub = null;
      })).subscribe(
        (cards)=>{
          this.pagination.totalRecords = cards.totalCount;
          let index = 0;
          this.deckList = cards.data.map((item)=>{
            item.index = index;
            index++;
            item.imageLoading = true;
            return item;
          });;
          this.pagination.loading = false;
          this.searchSub = null;
          this.deckAction.changeDeck(this.deck);
        }
      )
    },1);
    
  }

  finishedLoadingImage(card: Card | null): void {
    if(!this.deckList?.length || (!card?.index && card?.index!=0 )) return ;
    this.deckList[card.index].imageLoading = false;
  }

  addToDeck(card: Card | null): void {
    if(!card) return ;
    this.deck.cards.push(card);
    this.deck.cardMap[card.name] = true;
    this.notificationService.addNotification(`Added ${card.name} card to ${this.deck.name ?? 'the New Deck'}`);
    this.deckAction.changeDeck(this.deck);
  }

  removeCard(card: Card): void {
    const index  = this.deck.cards.findIndex(cardLoop=>(cardLoop.name === card.name));
    if(index || index == 0){
      delete this.deck.cardMap[this.deck.cards[index].name];
      this.deck.cards = this.deck.cards.splice(index,1);
      this.deckAction.changeDeck(this.deck);
    }
  }

}
