import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { WritingComponent } from './pages/writing/writing.component';
import { AuthorLayoutComponent } from './author-layout/author-layout.component';
import { authorPages } from './pages';


@NgModule({
  declarations: [
    AuthorLayoutComponent,
    ...authorPages
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule
  ]
})
export class AuthorModule { }
