import { Component, Input, OnInit } from '@angular/core';
import { MessageType } from 'src/app/models/message/message-type.enum';
import { IMessage } from 'src/app/models/message/message.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message?: IMessage;
  isErrorType: boolean = false;
  isOptionType: boolean = false;
  isSuccessType: boolean = false;

  ngOnInit(): void {
    console.log(this.message?.type);
    if (this.message) {
      switch (this.message.type) {
        case MessageType.error:
          this.isErrorType = true;
          break;
  
        case MessageType.option:
          this.isOptionType = true;
          break;
  
        case MessageType.success:
          this.isSuccessType = true;
          break;
      }
    }
    console.log(this.isOptionType);
    
  }
}
