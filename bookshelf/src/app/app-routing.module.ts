import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BookDetailComponent } from "./books/book-detail/book-detail.component";
import { BookEditComponent } from "./books/book-edit/book-edit.component";
import { BooksComponent } from "./books/books.component";

const appRoutes: Routes = [
   {path: '', redirectTo: '/books', pathMatch: 'full'},
    { path: 'books', component: BooksComponent, children: [
      { path: 'new', component: BookEditComponent },
      { path: ':id/edit', component: BookEditComponent }
   ]},
   { path: 'books/:id', component: BookDetailComponent } 
]


@NgModule ({
   imports: [RouterModule.forRoot(appRoutes)],
   exports: [RouterModule]
})
export class AppRoutingModule {}