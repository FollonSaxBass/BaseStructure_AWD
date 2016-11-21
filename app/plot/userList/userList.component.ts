import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
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

    @Input() isLoadingPlotta: boolean
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
                    if (this.msgs.length == 0 && !this.isLoadingPlotta)
                        this.msgs.push({
                            severity: 'error',
                            summary: 'Connectivity error',
                            detail: 'Check your connectivity and retry'
                        });
                } else if (content == "Errore") {
                    this.error = true
                    if (this.msgs.length == 0 && !this.isLoadingPlotta)
                        this.msgs.push({
                            severity: 'error',
                            summary: 'Server error',
                            detail: 'Something\'s gone wrong, try to reload or change data'
                        });
                } else if (content == "Loaded") {
                    this.msgs = []
                    this.error = false
                    this.users.sort((a: any, b: any) => {
                        if (a.string_name().toLowerCase() < b.string_name().toLowerCase()) {
                            return -1;
                        } else if (a.string_name().toLowerCase() > b.string_name().toLowerCase()) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
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
