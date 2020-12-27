import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateComponent } from './pages/activate/activate.component';
import { LoginComponent } from './pages/login/login.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetComponent } from './pages/reset/reset.component';

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
