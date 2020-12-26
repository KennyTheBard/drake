import { NgModule } from '@angular/core';
import { PlayerRoutingModule } from './player-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowseStoriesComponent } from './browse-stories/browse-stories.component';
import { PlayStoryComponent } from './play-story/play-story.component';
import { CharacterCreationComponent } from './character-creation/character-creation.component';
import { CommonModule } from '@angular/common';
import { PlayerLayoutComponent } from './player-layout/player-layout.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BrowseStoriesComponent,
    PlayStoryComponent,
    CharacterCreationComponent,
    PlayerLayoutComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
  ],
})
export class PlayerModule { }
