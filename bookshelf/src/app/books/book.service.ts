import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Subject } from "rxjs";

import { Book } from "./book.model";


@Injectable({
   providedIn: 'root'
})
export class BookService {
   books: Book[] = [];
   bookListUpdate = new Subject<Book[]>();
   bookSelectedEvent = new EventEmitter<Document>();

   constructor(private http: HttpClient) { }

   sortAndSave() {
      this.books.sort((a, b) => a.title > b.title ? 1 : -1);
      this.bookListUpdate.next(this.books);
   }

   getBooks() {
      this.http.get<{message: string; books: any}>('http://127.0.0.1:4200/books')
         .pipe(map((booksData) => {
            return booksData.books.map(book => {
               return {
                  id: book._id,
                  title: book.title,
                  author: book.author,
                  description: book.description,
                  imageUrl: book.imageUrl,
                  isbn: book.isbn,
                  tags: book.tags
               }
            })
         }))
         .subscribe({
            next: (transformedBooks) => {
               this.books = transformedBooks;
               this.sortAndSave();
            },
            error: (e) => console.log(e)
         }) 
   }

   getBook(id: string): Book {
      for (const book of this.books) {
         if (book.id === id) {
            return book;
         }
      };
      return null;
   }

   addBook(book: Book) {
      if(!book) {
         return;
      }

      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
      this.http.post<{message: String; book: Book}>('http://127.0.0.1:4200/books', book, {headers: headers})
         .subscribe(
            (responseData) => {
               this.books.push(responseData.book);
               this.sortAndSave();
            }
         )
   }

   updateBook(originalBook: Book, newBook: Book) {
      if(!originalBook || !newBook) {
         return;
      }

      const pos = this.books.findIndex(b => b.id === originalBook.id);
      
      if(pos < 0) {
         return;
      }

      newBook.id = originalBook.id;

      const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    //update database
    this.http.put('http://127.0.0.1:4200/books/' + originalBook.id, newBook, {headers: headers})
      .subscribe(
        (response: Response) => {
          this.books[pos] = newBook;
          this.sortAndSave();
        }
      )
   }

   deleteBook(book: Book) {
      if(!book) {
         return;
      }

      const pos = this.books.findIndex(b => b.id === book.id);

      if(pos < 0) {
         return;
      }

      this.http.delete('http://127.0.0.1:4200/books/' + book.id)
         .subscribe(
            () => {
               console.log('Deleted');
               this.books.splice(pos, 1);
               this.sortAndSave();
            }
         )
   }

   
}