import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  id: string;

  constructor(private bookService: BookService,
              private router: Router,
              private route: ActivatedRoute) {}

    save(id: string) {
      this.book = this.bookService.getBook(id);
      console.log(this.book)
    }
  
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.book = this.bookService.getBook(this.id);
        }
      );
      this.save(this.id);
  }

  onDelete(){
    this.bookService.deleteBook(this.book);
    this.router.navigate(['/books'], {relativeTo: this.route});
  }

  onEdit() {
    
  }

}
