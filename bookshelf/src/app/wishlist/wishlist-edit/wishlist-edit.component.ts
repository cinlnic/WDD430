import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  editMode: boolean = false;

  constructor(private wishlistService: WishlistService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];
          if (!id) {
            this.editMode = false;
            return;
          }

          this.originalBook = this.wishlistService.getBook(id);

          if (!this.originalBook) {
            return;
          }

          this.editMode = true;
          this.book = JSON.parse(JSON.stringify(this.originalBook));
        }
      )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newBook = new Book(
      value.title,
      value.author,
      value.description,
      value.imageUrl,
      value.isbn,
      value.tags
    );
    if(this.editMode) {
      this.wishlistService.updateBook(this.originalBook, newBook);
    } else {
      this.wishlistService.addBook(newBook);
    }
    this.router.navigateByUrl('/wishlist');
  }

  onCancel() {
    this.router.navigateByUrl('/wishlist');
  }
}
