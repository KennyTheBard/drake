import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { CommonModule } from '@angular/common';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { publicPages } from './pages';


@NgModule({
  declarations: [
    PublicLayoutComponent,
    ...publicPages
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PublicModule { }
