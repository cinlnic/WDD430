import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../../books/book.model';
import { WishlistService } from '../wishlist.service';


@Component({
  selector: 'app-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.css']
})
export class WishlistListComponent {
  books: Book[] = [];
  subscription: Subscription;
  term: string;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlistService.getBooks();
    this.subscription = this.wishlistService.wishlistUpdate
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
