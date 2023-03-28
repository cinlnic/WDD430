import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './books/book.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(books: Book[], term: string): any {
    let filteredBooks: Book[] = [];

    if (term && term.length > 0) {
      filteredBooks = books.filter(
        (book: Book) => book.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (filteredBooks.length < 1) {
      return books;
    }

    return filteredBooks;
  }

}
