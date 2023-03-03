import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number;
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor(private http: HttpClient) { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  storeDocuments() {
    const docs = JSON.stringify(this.documents);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json');

    this.http.put('https://wdd430-cms-app-default-rtdb.firebaseio.com/documents.json', docs, {'headers': headers})
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice())
      });
  }

  getDocuments() {
    this.http.get('https://wdd430-cms-app-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => {
            const docOne = a.name.toUpperCase(); 
            const docTwo = b.name.toUpperCase(); 
            if (docOne < docTwo) {
              return -1;
            }
            if (docOne > docTwo) {
              return 1;
            }
            return 0;
          });
          let documentListClone = this.documents.slice();
          this.documentListChangedEvent.next(documentListClone);
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  getDocument(id: string): Document {
    for (const document of this.documents){
      if(document.id === id) {
        return document
      }
    };
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach(document => {
      let currentId = parseInt(document.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addDocument(newDocument: Document) {
    if(!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
  
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if(!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if(pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;

    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if(!document) {
      return;
    }

    let pos = this.documents.indexOf(document);
    if(pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);

    this.storeDocuments();
  }

  

  // deleteDocument(document: Document) {
  //   if(!document) {
  //     return;
  //   }
  //   const pos = this.documents.indexOf(document);
  //   if(pos < 0) {
  //     return;
  //   }
  //   this.documents.splice(pos, 1);
  //   this.documentChangedEvent.emit(this.documents.slice());
  // }
}
