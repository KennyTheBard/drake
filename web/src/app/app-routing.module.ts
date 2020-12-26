import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, NotAuthGuard } from './guards';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
   {
      path: 'account',
      loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
      canActivate: [AuthGuard]
   },
   {
      path: 'player',
      loadChildren: () => import('./features/player/player.module').then(m => m.PlayerModule),
      canActivate: [AuthGuard]
   },
   {
      path: 'author',
      loadChildren: () => import('./features/author/author.module').then(m => m.AuthorModule),
      canActivate: [AuthGuard]
   },
   {
      path: 'public',
      loadChildren: () => import('./features/public/public.module').then(m => m.PublicModule),
      canActivate: [NotAuthGuard]
   },

   {
      path: '**',
      component: NotFoundComponent,
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {
}
