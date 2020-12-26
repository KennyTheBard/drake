import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    SettingsComponent,
    AccountLayoutComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
