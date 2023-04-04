export class Book {
   public id: String;
   public title: String;
   public author: String;
   public description: String;
   public imageUrl: String;
   public isbn: String;
  

   constructor(title: String, author: String, description: String, imageUrl: String, isbn: String) {
      this.title = title;
      this.author = author;
      this.description = description;
      this.imageUrl = imageUrl === null ? "../../../assets/images/books.jpg" : imageUrl;
      this.isbn = isbn;
   
   }
}