import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { ActivateComponent } from './activate/activate.component';
import { ResetComponent } from './reset/reset.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    RecoverComponent,
    ActivateComponent,
    ResetComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
  ]
})
export class PublicModule { }
