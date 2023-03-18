import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { map, Subject } from 'rxjs';
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
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
  }

  // storeDocuments() {
  //   const docs = JSON.stringify(this.documents);
  //   const headers = new HttpHeaders()
  //     .set('content-type', 'application/json');

  //   this.http.put('https://wdd430-cms-app-default-rtdb.firebaseio.com/documents.json', docs, {'headers': headers})
  //     .subscribe(() => {
  //       this.documentListChangedEvent.next(this.documents.slice())
  //     });
  // }

  sortAndSend() {
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
  }

  getDocuments() {
   this.http.get<{ message: string; documents: Document[] }>('http://127.0.0.1:4200/documents')
      .subscribe(
        (documentsData) => {
          this.documents = documentsData.documents;
          this.maxDocumentId = this.getMaxId();
          this.sortAndSend();
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

  addDocument(document: Document) {
    if(!document) {
      return;
    }

    document.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    //add to database
    this.http.post<{message: string, document: Document}>('http://127.0.0.1:4200/documents', document, {headers: headers})
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      )
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if(!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if(pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    //update database
    this.http.put('http://127.0.0.1:4200/documents/' + originalDocument.id, newDocument, {headers: headers})
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      )
  }

  deleteDocument(document: Document) {
    if(!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if(pos < 0) {
      return;
    }
    console.log(document.id)
    //delete from database
    this.http.delete('http://127.0.0.1:4200/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          console.log('Deleted');
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      )
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
