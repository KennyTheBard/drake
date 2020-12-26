import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivateComponent } from './activate/activate.component';
import { RecoverComponent } from './recover/recover.component';
import { ResetComponent } from './reset/reset.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ActivateComponent,
    RecoverComponent,
    ResetComponent,
    PublicLayoutComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
  ]
})
export class PublicModule { }
