import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(1, "Test", 'This is working!', "Rob"),
    new Message(2, "Test", 'This is working, too!', "Ethan"),
    new Message(3, "Test", 'This is working, three!', "Joshua")
  ];

  onAddMessage(message: Message) {
    this.messages.push(message); 
  }
}
