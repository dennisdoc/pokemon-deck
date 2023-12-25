import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateNotificationService } from '../../shared/services/template-notification.service';
import { IgxSnackbarComponent } from 'igniteui-angular';
import { DeckUser } from '../../shared/model/deck.model';
import { DeckActionsService } from '../../shared/services/deck-actions.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent implements OnInit{
  @ViewChild('snackbar') snackbar!: IgxSnackbarComponent;
  peakDeckAction = false;
  deck: DeckUser | null = null;

  constructor(
    private notificationService: TemplateNotificationService,
    private deckActionService: DeckActionsService,
    private _location: Location,
    private router: Router
    ){}

  ngOnInit(): void {
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
        this.deck = deck;
      }
    )
    this.deckActionService.listenToPeek().subscribe(
      (peek)=>{
        this.peakDeckAction = peek;
      }
    )
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

}
