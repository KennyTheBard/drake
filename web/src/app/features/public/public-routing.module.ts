import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateComponent } from './activate/activate.component';
import { LoginComponent } from './login/login.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { RecoverComponent } from './recover/recover.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'recover',
        component: RecoverComponent,
      },
      {
        path: 'reset',
        component: ResetComponent,
      },
      {
        path: 'activate',
        component: ActivateComponent,
      },
    ]
  }
];;

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class PublicRoutingModule { }
