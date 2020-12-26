import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { filter, first } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class Store {
   private readonly user = new BehaviorSubject<User | null | undefined>(undefined);

   setUser(user: User) {
      this.user.next(user);
   }

   removeUser() {
      this.user.next(null);
   }

   getUser(): Observable<User | null | undefined> {
      return this.user.asObservable().pipe(
         filter(v => v !== undefined),
         first()
      );
   }

   watchUser(): Observable<User | null | undefined> {
      return this.user.asObservable().pipe(
         filter(v => v !== undefined)
      );
   }

}