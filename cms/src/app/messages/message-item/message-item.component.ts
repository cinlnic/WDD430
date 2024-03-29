import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
@Input() message: Message;
messageSender: string;

constructor(private contactService: ContactService) {}

ngOnInit() {
  console.log(this.message);
  const contact: Contact = this.contactService.getContact(this.message.sender);
  console.log(this.message.sender);
  
  this.messageSender = contact.name;
}

}
