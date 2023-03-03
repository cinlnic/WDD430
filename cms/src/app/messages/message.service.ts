import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  maxMessageId: number;
  messageChangedEvent = new Subject<Message[]>();
  
  constructor(private http: HttpClient) { 
    //this.messages = MOCKMESSAGES;
  }

  storeMessages() {
    const messageString = JSON.stringify(this.messages);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json');

    this.http.put('https://wdd430-cms-app-default-rtdb.firebaseio.com/messages.json', messageString, {'headers': headers})
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  getMessages() {
    this.http.get('https://wdd430-cms-app-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();

          let messageCloneList = this.messages.slice();
          this.messageChangedEvent.next(messageCloneList);
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  getMessage(id: string): Message {
    this.messages.forEach(message => {
      if(message.id === id) {
        return message;
      }
    });

    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach(message => {
      let currentId = parseInt(message.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

}
