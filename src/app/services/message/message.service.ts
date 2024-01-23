import { Injectable } from '@angular/core';
import { MessageType } from 'src/app/models/message/message-type.enum';
import { IMessage } from 'src/app/models/message/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  timeOutMessage?: NodeJS.Timeout;
  message?: IMessage | null;

  setMessageTimeOut(newMessage: IMessage) {
    this.message = newMessage;
    clearTimeout(this.timeOutMessage);
    this.timeOutMessage = setTimeout(() => {
      this.message = null;
    }, 3000);        
  }
}
