import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: AccountLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'settings',
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
