import { ResponseInterceptor } from './interceptors/response.interceptor';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    RequestInterceptor,
    ResponseInterceptor,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
