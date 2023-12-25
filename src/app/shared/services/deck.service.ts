import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { DeckList, DeckUser } from '../model/deck.model';
import { DECK_LIST_SAVED, DECK_STORAGE } from '../const/storage.const';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private baseAPI = "https://api.pokemontcg.io/v2/cards";

  constructor(
    private http:HttpClient,
    private storage: StorageService
    ) { }


  getAllCards(page = 0, pageSize = 18): Observable<DeckList>{
    const storage = localStorage.getItem(DECK_STORAGE+`${page}_${pageSize}`);
    if(storage){
      const data = JSON.parse(storage);
      if(data.lastFetch === new Date().toDateString()){
        return new Observable((obs=>{
          obs.next(data.data);
          return ;
        }))
      }
      
    }
    
    return this.http.get<DeckList>(this.baseAPI,{params:{page:page+1,pageSize:pageSize}}).pipe(tap((data)=>{
      localStorage.setItem(DECK_STORAGE+`${page}_${pageSize}`,JSON.stringify({lastFetch: new Date().toDateString(),data:data}));
    }))
  }

  getDecksSaved(): DeckUser[]{
    return this.storage.getItem(DECK_LIST_SAVED);
  }

}
