import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { HeaderComponent } from './header/header.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookItemComponent } from './books/book-item/book-item.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from './search-filter.pipe';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistListComponent } from './wishlist/wishlist-list/wishlist-list.component';
import { WishlistItemComponent } from './wishlist/wishlist-item/wishlist-item.component';
import { WishlistEditComponent } from './wishlist/wishlist-edit/wishlist-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HeaderComponent,
    BookListComponent,
    BookDetailComponent,
    BookEditComponent,
    BookItemComponent,
    SearchFilterPipe,
    WishlistComponent,
    WishlistListComponent,
    WishlistItemComponent,
    WishlistEditComponent,  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [BookDetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
