import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit{
  originalBook: Book;
  book: Book;
  editMode: boolean = false;
  
  constructor(private bookService: BookService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    // this.route.paramMap.subscribe(
    //   (paramMap: ParamMap) => {
    //     if (paramMap.has('id')) {
    //       this.editMode = true;
    //       this.bookId = paramMap.get('id');
    //       this.book = this.bookService.getBook(this.bookId);
    //     } else {
    //       this.editMode = false;
    //       this.bookId = null;
    //     }
    //   }
    // );
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];
          if (!id) {
            this.editMode = false;
            return;
          }

          this.originalBook = this.bookService.getBook(id);

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
      value.isbn
    );
    if(this.editMode) {
      this.bookService.updateBook(this.originalBook, newBook);
    } else {
      this.bookService.addBook(newBook);
    }
    this.router.navigateByUrl('/books');
  }

  onCancel() {
    this.router.navigateByUrl('/books');
  }
}
