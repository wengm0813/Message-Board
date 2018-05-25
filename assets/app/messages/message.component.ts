import {Component, Input} from '@angular/core';
import { Message } from "./message.model";
import {MessageService} from "./message.service";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',

})

export class MessageComponent{
    @Input() message: Message;

    constructor(private messageServie: MessageService){

    }
    onEdit(){
        this.messageServie.editMessage(this.message);
    }

    onDelete(){
        this.messageServie.deleteMessage(this.message)
            //call back
            .subscribe(
                result => console.log(result)
            );
    }

    belongsToUser(){
        return localStorage.getItem('userId') == this.message.userId;
    }
}