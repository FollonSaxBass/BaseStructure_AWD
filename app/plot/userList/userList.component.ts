import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DataService, User} from "../../data.service";

@Component({
    selector: 'user-list-plot',
    templateUrl: './app/plot/userList/userList.component.html'
})

export class userList implements OnInit {
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
