import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BookDetailComponent } from "./books/book-detail/book-detail.component";
import { BookEditComponent } from "./books/book-edit/book-edit.component";
import { BooksComponent } from "./books/books.component";
import { WishlistEditComponent } from "./wishlist/wishlist-edit/wishlist-edit.component";
import { WishlistComponent } from "./wishlist/wishlist.component";

const appRoutes: Routes = [
   {path: '', redirectTo: '/books', pathMatch: 'full'},
   { path: 'books', component: BooksComponent },
   { path: 'books/new', component: BookEditComponent },
   { path: 'books/:id/edit', component: BookEditComponent },
   { path: 'books/:id', component: BookDetailComponent },
   { path: 'wishlist', component: WishlistComponent },
   { path: 'wishlist/new', component: WishlistEditComponent },
]


@NgModule ({
   imports: [RouterModule.forRoot(appRoutes)],
   exports: [RouterModule]
})
export class AppRoutingModule {}