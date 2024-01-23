import { Component, Input } from '@angular/core';
import { IMessage } from 'src/app/models/message/message.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message?: IMessage;
}
