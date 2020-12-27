import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from 'src/app/services/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   constructor(
      private readonly http: HttpClient,
      private readonly store: Store
   ) { }

   login(username: string, password: string): Observable<User> {
      return this.http.post('auth/login', {
         username: username,
         password: password
      }).pipe(
         map((res: Object) => res as User),
         map((res: User) => {
            // keep user data in local storage
            localStorage.setItem('authToken', res.authToken);
            this.store.setUser(res);

            return res;
         })
      );
   }

}