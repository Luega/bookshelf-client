import { MessageType } from "./message-type.enum";

export interface IMessage {
    text: string,
    type: MessageType
}