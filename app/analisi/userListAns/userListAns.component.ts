import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DataService, User, Colonna} from "../../data.service";
import {Message} from "primeng/components/common/api";

@Component({
    selector: 'user-list-ans-plot',
    templateUrl: './app/analisi/userListAns/userListAns.component.html'
})

export class userListAns {
    msgs: Message[] = [];
    error = false
    itsFirst = true

    @Input() users: User[]

    selectedUser: User

    @Output() onSelectedUser = new EventEmitter();

    onSelect(user: User): void {
        this.selectedUser = user;
        this.onSelectedUser.emit(this.selectedUser)
    }

    constructor(private dataService: DataService) {
        dataService.userSource$.subscribe(
            content => {
                if (content == "Errore0") {
                    this.error = true
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
                this.itsFirst=false
            });
    }

    reLoad() {
        this.msgs = []
        this.error = false
        this.dataService.loadUsers()
        this.users = this.dataService.getUsers()
    }
}
