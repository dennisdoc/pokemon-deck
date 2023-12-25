import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, obj: string): void {
    localStorage.setItem(key,obj);
  }

  getItem(key: string, parsed = true): any | string {
    const storage = localStorage.getItem(key);
    if(parsed && storage){
      try{
        return JSON.parse(storage);
      }catch(ex){
        return storage;
      }
    }
    return storage;
  }

}
