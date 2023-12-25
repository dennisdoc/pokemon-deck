import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateNotificationService {
  private notification = new BehaviorSubject<string | null>(null);

  constructor() { }

  addNotification(value: string): void {
    if(!value) this.clearNotification();
    this.notification.next(value);
  }

  clearNotification(): void {
    this.notification.next(null);
  }

  listenNotification(): Observable<string | null>{
    return this.notification;
  }

}
