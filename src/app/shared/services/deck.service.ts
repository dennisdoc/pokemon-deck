import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { DeckList, DeckUser } from '../model/deck.model';
import { DECK_LIST_SAVED, DECK_STORAGE } from '../const/storage.const';
import { StorageService } from './storage.service';
import { SearchActionObj } from '../model/search.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private baseAPI = "https://api.pokemontcg.io/v2/cards";

  constructor(
    private http:HttpClient,
    private storage: StorageService
    ) { }


  getAllCards(page = 0, pageSize = 18, search: SearchActionObj | null = null): Observable<DeckList>{
    const storage = localStorage.getItem(DECK_STORAGE+`${page}_${pageSize}`);
    if(storage && !search){
      const data = JSON.parse(storage);
      if(data.lastFetch === new Date().toDateString()){
        return new Observable((obs=>{
          obs.next(data.data);
          return ;
        }))
      }
      
    }

    let params: any = {page:page+1,pageSize:pageSize};

    if(search){
      params.q = `name:*${search.name}*`;
    }
    
    return this.http.get<DeckList>(this.baseAPI,{params:params}).pipe(tap((data)=>{
      if(search) return ;
      localStorage.setItem(DECK_STORAGE+`${page}_${pageSize}`,JSON.stringify({lastFetch: new Date().toDateString(),data:data}));
    }))
  }

  getDecksSaved(): DeckUser[]{
    return this.storage.getItem(DECK_LIST_SAVED);
  }

}
