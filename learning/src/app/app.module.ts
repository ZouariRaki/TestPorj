import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/cours/list/list.component';
import { AddcoursComponent } from './components/cours/addcours/addcours.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatecoursComponent } from './components/cours/updatecours/updatecours.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    AddcoursComponent,
    UpdatecoursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
