import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { AuthorLayoutComponent } from './author-layout/author-layout.component';
import { WritingComponent } from './pages/writing/writing.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'analytics',
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
      },
      {
        path: 'writing',
        component: WritingComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
