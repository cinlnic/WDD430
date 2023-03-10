import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  invalidGroupContact: boolean;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {}

              
  ngOnInit() {
    this.route.params 
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

          if(!this.id) {
            this.editMode = false;
            return;
          }

          this.originalContact = this.contactService.getContact(this.id);
          if(!this.originalContact) {
            return;
          }

          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));

          if(this.originalContact.group !== null) {
            console.log(this.originalContact.group);
            this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
          }
        }
      )
  } 

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);
    const newContact = new Contact(
      this.id,
      value.name, 
      value.email,
      value.phone, 
      value.imageUrl,
      this.groupContacts
    );
    if(this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigateByUrl('/contacts');
    console.log(newContact);
  }

  onCancel() {
    this.router.navigateByUrl('/contacts');
  }

  isValidContact(newContact: Contact) {
    if(!newContact) {
      return true;
    }

    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }

    for(let i = 0; i < this.groupContacts.length; i++) {
      if(newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    console.log($event);
    const selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isValidContact(selectedContact);

    if(this.invalidGroupContact) {
      return;
    }
    
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if(index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

}



