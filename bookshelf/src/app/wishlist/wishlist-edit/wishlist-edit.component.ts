import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/books/book.model';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist-edit',
  templateUrl: './wishlist-edit.component.html',
  styleUrls: ['./wishlist-edit.component.css']
})
export class WishlistEditComponent {
  originalBook: Book;
  book: Book;

  constructor(private wishlistService: WishlistService,
              private router: Router) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newBook = new Book(
      value.title,
      value.author,
      value.description,
      value.imageUrl,
      value.isbn
    );
  
    this.wishlistService.addBook(newBook);
    
    this.router.navigateByUrl('/wishlist');
  }

  onCancel() {
    this.router.navigateByUrl('/wishlist');
  }
}
