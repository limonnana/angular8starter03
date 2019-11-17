import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialDesignModule } from '../material-design/material-design.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    ...fromContainers.containers,
    ...fromComponents.components,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
