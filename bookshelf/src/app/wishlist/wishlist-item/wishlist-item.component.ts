import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/books/book.model';
import { BookService } from 'src/app/books/book.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.css']
})
export class WishlistItemComponent {
  @Input() book: Book;

  constructor(private wishlistService: WishlistService,
              private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  moveToShelf() {
    this.bookService.addBook(this.book);
    this.onDelete();
    this.router.navigate(['/books'], {relativeTo: this.route});
  }

  onDelete(){
    this.wishlistService.deleteBook(this.book);
    this.router.navigate(['/wishlist'], {relativeTo: this.route});
  }
}
