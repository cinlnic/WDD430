import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  currentSender: string = 'Cindi';

  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>()

  onSendMessage() {
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    
    const newMessage = new Message(1, msgSubject, msgText, this.currentSender);

    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
