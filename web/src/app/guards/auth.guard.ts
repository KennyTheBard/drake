import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Store } from '../services/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private readonly store: Store,
    private readonly router: Router
  ) {
  }

  canActivate() {
    return this.validate();
  }

  canLoad() {
    return this.validate();
  }

  private async validate() {
    // TODO: Fix this later
    return true;
    const user = await this.store.getUser().toPromise();

    if (!user) {
      this.router.navigate(['/public/login']);
      return false;
    }
    return true;
  }
}
