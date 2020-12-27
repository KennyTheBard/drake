import { NgModule } from '@angular/core';
import { PlayerRoutingModule } from './player-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowseStoriesComponent } from './pages/browse-stories/browse-stories.component';
import { PlayStoryComponent } from './pages/play-story/play-story.component';
import { CharacterCreationComponent } from './pages/character-creation/character-creation.component';
import { CommonModule } from '@angular/common';
import { PlayerLayoutComponent } from './player-layout/player-layout.component';
import { playerPages } from './pages';

@NgModule({
  declarations: [
    PlayerLayoutComponent,
    ...playerPages
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
  ],
})
export class PlayerModule { }
