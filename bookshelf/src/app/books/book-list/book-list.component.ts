import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy{
  books: Book[] = [];
  subscription: Subscription;
  term: string;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks();
    this.subscription = this.bookService.bookListUpdate
      .subscribe(
        (books: Book[]) => {
          this.books = books;
        }
      );
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
