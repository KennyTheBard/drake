import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '../services/store';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  constructor(
    private readonly store: Store,
    private readonly router: Router
  ) {
  }

  async canActivate() {
    const user = await this.store.getUser().toPromise();

    if (user) {
      await this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
