import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseStoriesComponent } from './pages/browse-stories/browse-stories.component';
import { CharacterCreationComponent } from './pages/character-creation/character-creation.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PlayStoryComponent } from './pages/play-story/play-story.component';
import { PlayerLayoutComponent } from './player-layout/player-layout.component';

const routes: Routes = [{
  path: '',
  component: PlayerLayoutComponent,
  children: [
    {
      path: '',
      redirectTo: 'dashboard'
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'browse',
      component: BrowseStoriesComponent
    },
    {
      path: 'play/:storyId',
      component: PlayStoryComponent
    },
    {
      path: 'play/:storyId/character',
      component: CharacterCreationComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
