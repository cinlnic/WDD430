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

  storeContact() {
    const contactString = JSON.stringify(this.contacts);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json');

    this.http.put('https://wdd430-cms-app-default-rtdb.firebaseio.com/contacts.json', contactString, {'headers': headers})
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice())
      });
  }

  getContacts() {
    this.http.get('https://wdd430-cms-app-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
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
    if(!Contact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContact();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if(pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContact();
  }

  deleteContact(contact: Contact) {
    if(!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if(pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContact();
  }
}
