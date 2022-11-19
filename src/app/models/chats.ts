import { Collection } from "typescript";

export class Chats{
    chatId?: number;
    customerEmail: string = "";
    customerId?: number;
    created?: Date;
    messages: string[] = [];
    replies: string[] = [];
}

export class SendMessage{
    chatId?: number;
    
    messages: string = "";
}

export class ReplyMessage{
    chatId?: number;
    
    replies: string = "";
}