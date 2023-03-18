import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor(private http: HttpClient) { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  // storeContact() {
  //   const contactString = JSON.stringify(this.contacts);
  //   const headers = new HttpHeaders()
  //     .set('content-type', 'application/json');

  //   this.http.put('https://wdd430-cms-app-default-rtdb.firebaseio.com/contacts.json', contactString, {'headers': headers})
  //     .subscribe(() => {
  //       this.contactListChangedEvent.next(this.contacts.slice())
  //     });
  // }

  sortAndSend() {
    this.contacts.sort((a, b) => {
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
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

  getContacts() {
    this.http.get<{ message: string; contacts: Contact[] }>('http://127.0.0.1:4200/contacts')
      .subscribe(
        (contactData) => {
          this.contacts = contactData.contacts;
          this.maxContactId = this.getMaxId();
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if(contact.id === id) {
        return contact;
      }
    };
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach(contact => {
      let currentId = parseInt(contact.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addContact(newContact: Contact) {
    if(!newContact) {
      return;
    }

    newContact.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    //add to database
    this.http.post<{message: string; contact: Contact}>('http://127.0.0.1:4200/contacts', newContact, {headers: headers})
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      )
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);
    if(pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    //update database
    this.http.put('http://127.0.0.1:4200/contacts/' + originalContact.id, newContact, {headers: headers})
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      )
  }

  deleteContact(contact: Contact) {
    if(!contact) {
      return;
    }
    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if(pos < 0) {
      return;
    }

    //delete from database
    this.http.delete('http://127.0.0.1:4200/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      )
  }
}
