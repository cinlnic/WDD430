import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Book } from '../books/book.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlistBooks: Book[] = [];
  wishlistUpdate = new Subject<Book[]>();

  constructor(private http: HttpClient) {}

  sortAndSave() {
    this.wishlistBooks.sort((a, b) => (a.title > b.title ? 1 : -1));
    this.wishlistUpdate.next(this.wishlistBooks);
  }

  getBooks() {
    this.http
      .get<{ message: string; books: any }>(
        'http://127.0.0.1:4200/wishlist'
      )
      .pipe(
        map((booksData) => {
          return booksData.books.map((book) => {
            return {
              id: book._id,
              title: book.title,
              author: book.author,
              imageUrl: book.imageUrl
            };
          });
        })
      )
      .subscribe({
        next: (transformedWishlist) => {
          this.wishlistBooks = transformedWishlist;
          this.sortAndSave();
        },
        error: (e) => console.log(e),
      });
  }

  addBook(book: Book) {
    if (!book) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: String; book: Book}>('http://127.0.0.1:4200/wishlist', book, { headers: headers })
        .subscribe((responseData) => {
          this.wishlistBooks.push(responseData.book);
          this.sortAndSave();
        });
  }


  deleteBook(book: Book) {
    if(!book) {
       return;
    }

    const pos = this.wishlistBooks.findIndex(b => b.id === book.id);

    if(pos < 0) {
       return;
    }

    this.http.delete('http://127.0.0.1:4200/wishlist/' + book.id)
       .subscribe(
          () => {
             console.log('Deleted');
             this.wishlistBooks.splice(pos, 1);
             this.sortAndSave();
          }
       )
 }

}
