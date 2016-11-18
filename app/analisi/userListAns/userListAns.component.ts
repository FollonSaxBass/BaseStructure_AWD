import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DataService, User, Colonna} from "../../data.service";

@Component({
    selector: 'user-list-ans-plot',
    templateUrl: './app/analisi/userListAns/userListAns.component.html'
})

export class userListAns {

    @Input() users: User[]

    selectedUser: User

    @Output() onSelectedUser = new EventEmitter();

    onSelect(user: User): void {
        this.selectedUser = user;
        this.onSelectedUser.emit(this.selectedUser)
    }
}
