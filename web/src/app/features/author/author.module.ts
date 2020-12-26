import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AnalyticsComponent } from './analytics/analytics.component';
import { WritingComponent } from './writing/writing.component';
import { AuthorLayoutComponent } from './author-layout/author-layout.component';


@NgModule({
  declarations: [
    AnalyticsComponent,
    WritingComponent,
    AuthorLayoutComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule
  ]
})
export class AuthorModule { }
