import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { BrowseStoriesComponent } from './features/browse-stories/browse-stories.component';
import { PlayStoryComponent } from './features/play-story/play-story.component';
import { CharacterCreationComponent } from './features/character-creation/character-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BrowseStoriesComponent,
    PlayStoryComponent,
    CharacterCreationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
