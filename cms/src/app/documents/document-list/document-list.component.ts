import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, 'WDD130 Web Fundamentals', 'This course introduces students to the World Wide Web and to careers in web site design and development.', 
                'https://byui.instructure.com/courses/52042/assignments/syllabus', []),
    new Document(2, 'WDD 331R Advanced CSS', 'This course provides deeper learning into topics in cascading style sheets (CSS).', 
                'https://byui.instructure.com/courses/186612/assignments/syllabus', []),
    new Document(3, 'WDD430 Web Full-Stack Development', 'This course will teach you how to design and build interactive web based applications using HTML, CSS, JavaScript, and a web development stack.', 
                'https://byui.instructure.com/courses/85726/assignments/syllabus', []),
    new Document(4, 'CSE340 Web Backend Development I', 'This programming course focuses on constructing dynamic web sites using server-side languages, making use of databases and design patterns.', 
                'https://byui.instructure.com/courses/16731/assignments/syllabus', []),
    new Document(5, 'CSE341 Web Backend Development II', 'This course focuses on the backend development of dynamic, service-oriented web applications', 
                'https://byui.instructure.com/courses/32538/assignments/syllabus', []),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
