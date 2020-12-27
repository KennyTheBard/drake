import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateComponent } from './pages/activate/activate.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { ResetComponent } from './pages/reset/reset.component';
import { publicPages } from './pages';


@NgModule({
  declarations: [
    PublicLayoutComponent,
    ...publicPages
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
  ]
})
export class PublicModule { }
