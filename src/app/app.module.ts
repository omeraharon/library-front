import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { Page404Component } from './components/page404/page404.component';
import { BookListComponent } from './components/book-area/book-list/book-list.component';
import { BookCardComponent } from './components/book-area/book-card/book-card.component';
import { BookActionsComponent } from './components/book-area/book-actions/book-actions.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { DeleteBookComponent } from './components/book-area/delete-book/delete-book.component';


@NgModule({
  declarations: [
    LayoutComponent,
    Page404Component,
    BookListComponent,
    BookCardComponent,
    BookActionsComponent,
    HeaderComponent,
    DeleteBookComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
