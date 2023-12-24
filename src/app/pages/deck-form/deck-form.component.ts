import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../shared/services/deck.service';
import { Deck } from '../../shared/model/deck.model';
import { cloneDeep } from 'lodash';
import { Subscriber, Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrl: './deck-form.component.scss'
})
export class DeckFormComponent implements OnInit{
  deckListFull: Deck[] | null = null;
  deckList: Deck[] | null = null;
  pagination = {
    size: 16,
    totalRecords: 10,
    loading: false
  }
  searchSub: Subscription | null = null;

  constructor(private service: DeckService){}

  ngOnInit(): void {
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
          this.deckList = cards.data.map((item)=>{
            item.imageLoading = true;
            return item;
          });;
          this.pagination.loading = false;
          this.searchSub = null;
        }
      )
    },1);
    
  }

  finishedLoadingImage(index: number): void {
    if(!this.deckList?.length) return ;
    this.deckList[index].imageLoading = false;
  }

}
