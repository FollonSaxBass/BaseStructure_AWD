import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DataService, User} from "../../data.service";
import {Message} from "primeng/components/common/api";
import {$SEMICOLON} from "@angular/compiler/src/chars";

@Component({
    selector: 'user-list-plot',
    templateUrl: './app/plot/userList/userList.component.html'
})

export class userList implements OnInit {
    msgs: Message[] = [];
    error = false

    users: User[]
    selectedUser: User

    daFiltrare: string

    @Output() onSelectUser = new EventEmitter();


    onSelect(user: User): void {
        this.selectedUser = user;
        this.onSelectUser.emit(this.selectedUser)
    }

    ngOnInit() {
        this.users = this.dataService.getUsers()

    }

    constructor(private dataService: DataService) {
        dataService.userSource$.subscribe(
            content => {
                this.onSelectUser.emit(null)
                if (content == "Errore0") {
                    this.error = true
                    //No connettività
                    if (this.msgs.length == 0)
                        this.msgs.push({
                            severity: 'error',
                            summary: 'Connectivity error',
                            detail: 'Check your connectivity and retry'
                        });
                } else if (content == "Errore") {
                    this.error = true
                    if (this.msgs.length == 0)
                        this.msgs.push({
                            severity: 'error',
                            summary: 'Server error',
                            detail: 'Something\'s gone wrong, try to reload or change data'
                        });
                } else if (content == "Loaded") {
                    this.msgs = []
                    this.error = false
                }
            });
    }

    reLoad() {
        this.msgs = []
        this.error = false
        this.dataService.loadUsers()
        this.users = this.dataService.getUsers()
    }
}
