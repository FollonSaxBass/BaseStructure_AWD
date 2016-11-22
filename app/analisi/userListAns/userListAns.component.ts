import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DataService, User, Colonna} from "../../data.service";
import {Message} from "primeng/components/common/api";

@Component({
    selector: 'user-list-ans-plot',
    templateUrl: './app/analisi/userListAns/userListAns.component.html'
})

/**
 * Controller della lista di utenti per quanto riguarda l'analisi singola
 */
export class userListAns {
    msgs: Message[] = [];
    error = false
    itsFirst = true

    @Input() users: User[]

    selectedUser: User

    @Output() onSelectedUser = new EventEmitter();

    /**
     * Selezione dello user con cambio evidenziazione nella view
     * @param user
     */
    onSelect(user: User): void {
        this.selectedUser = user;
        this.onSelectedUser.emit(this.selectedUser)
    }

    /**
     * Costruttore che intercetta anche l'errore in caso di fallimento nel caricamento degli utenti
     * @param dataService
     */
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
                this.itsFirst = false
            });
    }

    /**
     * Reload degli utenti
     */
    reLoad() {
        this.msgs = []
        this.error = false
        this.dataService.loadUsers()
        this.users = this.dataService.getUsers()
    }
}
