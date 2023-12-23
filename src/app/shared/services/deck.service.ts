import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeckList } from '../model/deck.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  baseAPI = "https://api.pokemontcg.io/v2/cards";

  constructor(private http:HttpClient) { }


  getAllCards(): Observable<DeckList>{
    return this.http.get<DeckList>(this.baseAPI);
  }

}
