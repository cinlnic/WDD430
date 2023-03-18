import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  sortAndSend() {
    let messageListClone = this.messages.slice();
    this.messageChangedEvent.next(messageListClone);
  }

  getMessages() {
    this.http.get<{message: string, messages: Message[] }>('http://127.0.0.1:4200/messages')
      .subscribe(
        (messageData) => {
          console.log(messageData),
          this.messages = messageData.messages;
          this.maxMessageId = this.getMaxId();
          this.sortAndSend();
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
    if(!message) {
      return;
    }

    message.id = "";
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    //add to database
    this.http.post<{message: string, newMessage: Message}>('http://127.0.0.1:4200/documents', document, {headers: headers})
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.newMessage);
          this.sortAndSend();
        }
      )
  }

}
