import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DataService, User} from "../../data.service";

@Component({
    selector: 'user-list-ans-plot',
    templateUrl: './app/analisi/userListAns/userListAns.component.html'
})

export class userListAns implements OnInit {
    Title = "Plot component"
    users: User[]
    selectedUser: User

    @Output() onSelectUser = new EventEmitter();

    onSelect(user: User): void {
        this.selectedUser = user;
        this.onSelectUser.emit(this.selectedUser)
    }

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.users = this.dataService.getUsers()
    }
}
