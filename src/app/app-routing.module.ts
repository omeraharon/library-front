import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookActionsComponent } from './components/book-area/book-actions/book-actions.component';
import { BookListComponent } from './components/book-area/book-list/book-list.component';
import { DeleteBookComponent } from './components/book-area/delete-book/delete-book.component';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
    {path: "home", component: BookListComponent},
    {path: "book-actions", component: BookActionsComponent},
    {path: "delete/:uuid", component: DeleteBookComponent},
    {path: "", redirectTo: "/home", pathMatch: "full"},
    { path: "**", component: Page404Component }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
