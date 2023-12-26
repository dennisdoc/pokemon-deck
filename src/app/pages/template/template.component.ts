import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateNotificationService } from '../../shared/services/template-notification.service';
import { IgxSnackbarComponent } from 'igniteui-angular';
import { Card, DeckUser } from '../../shared/model/deck.model';
import { DeckActionsService } from '../../shared/services/deck-actions.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Event, NavigationEnd, Params, Router } from '@angular/router';
import { SearchActionObj } from '../../shared/model/search.model';
import { countCoresfromDeck } from '../../shared/util/card.util';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent implements OnInit{
  @ViewChild('snackbar') snackbar!: IgxSnackbarComponent;
  peakDeckAction = false;
  deck: DeckUser | null = null;
  isFormPage = false;
  search: any | SearchActionObj = {name: null};

  constructor(
    private notificationService: TemplateNotificationService,
    private deckActionService: DeckActionsService,
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.checkIsFormPage(this.router.url)
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
          // Hide progress spinner or progress bar
          console.info('event',event.url);  
          this.checkIsFormPage(event.url)   
      }
    });
    this.route.queryParams.subscribe(
      (query)=>{
        this.search = {name: query['name']};
      }
    )
    this.notificationService.listenNotification().subscribe(
      (notification)=>{
        if(notification){
          this.snackbar?.open(notification);
        }else{
          this.snackbar?.close();
        }
        
      }
    )
    this.deckActionService.listenToDeck().subscribe(
      (deck)=>{
        if(!deck) return ;
        deck.pokemonCards = deck.cards?.filter(card=>(card.supertype==="Pokémon"));
        deck.trainerCards = deck.cards?.filter(card=>(card.supertype==="Trainer"));
        deck.energyCards = deck.cards?.filter(card=>(card.supertype==="Energy"));
        deck.coreCount = countCoresfromDeck(deck);
        this.deck = deck;
        console.info('this.deck',this.deck);
      }
    )
    this.deckActionService.listenToPeek().subscribe(
      (peek)=>{
        this.peakDeckAction = peek;
      }
    )
  }
  
  checkIsFormPage(url: string): void {
    this.isFormPage = url.includes('/deck/add') || url.includes('deck/edit'); 
    if(this.isFormPage){
      this.deck = new DeckUser();
    }
  }

  togglePeek(): void {
    this.peakDeckAction = this.peakDeckAction ? false:true;
  }

  deckNameChange(name: string): void {
    if(!this.deck) return ;
    this.deck.name = name;
    this.deckActionService.changeDeck(this.deck);
  }

  public navigateBack() {
    this._location.back();
  }

  public canGoBack() {
      if(this.router.url === '/deck'){
        return false;
      }
      return window.history.length > 0;
  }

  saveDeck(): void {
    if(!this.deck) return ;
    const validateMin = this.deck.cards.length >= 24;
    const validateMax = this.deck.cards.length <= 60;
    if(validateMin && validateMax){
      this.deckActionService.changeDeck(this.deck,true);
      this.notificationService.addNotification('Deck Saved');
      setTimeout(()=>{
        this.router.navigate(['/deck']);
      },100);
    }else if(!validateMin){
      this.notificationService.addNotification('Deck has not enough cards. 24 cards is the minimal requirement');
    }else if(!validateMax){
      this.notificationService.addNotification('Deck has too much cards. 60 cards is the maximum');
    }
    
  }

  addDeck(): void {
    this.deck = {
      id: null,
      name: null,
      cards: [],
      cardMap: {}
    }
    this.deckActionService.changeDeck(this.deck);
    this.router.navigate(['/deck/add']);
  }

  searchChange(value: string, type: string): void {
    this.search[type] = value;
    // this.searchAction.search(this.search);
    const queryParams: Params = { [type]: value };
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams, 
        skipLocationChange: true,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );
  }

  removeCard(card: Card): void {
    if(!this.deck) return ;
    let foundIndex = this.deck.cards.findIndex(cardItem=>(cardItem.id===card.id));
    if(foundIndex >=0){
      const cardName = this.deck.cards[foundIndex].name;
      this.deck.cards.splice(foundIndex,1);
      this.deck.pokemonCards = this.deck.cards?.filter(card=>(card.supertype==="Pokémon"));
      this.deck.trainerCards = this.deck.cards?.filter(card=>(card.supertype==="Trainer"));
      this.deck.energyCards = this.deck.cards?.filter(card=>(card.supertype==="Energy"));
      this.deck.coreCount = countCoresfromDeck(this.deck);
      this.deckActionService.changeDeck(this.deck);
      this.notificationService.addNotification(`${cardName} Card will be deleted, Press save to confirm`);
    }
  }

}
