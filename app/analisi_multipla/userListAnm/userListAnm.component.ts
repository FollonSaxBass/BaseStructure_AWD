import {
    Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges,
    ChangeDetectionStrategy
} from '@angular/core';
import {DataService, User, Oggetto, Colonna} from "../../data.service";

@Component({
    selector: 'user-list-an-mul',
    templateUrl: './app/analisi_multipla/userListAnm/userListAnm.component.html'
})

export class userListAnm {

    remove(arr: any, what: any) {
        var found = arr.indexOf(what);

        while (found !== -1) {
            arr.splice(found, 1);
            found = arr.indexOf(what);
        }
    }

    @Input() isLoadingAnalisi: boolean
    @Input() users: any;
    @Input() selectedColumn: any;

    selectedUsers: User[] = []

    @Output() onInvia = new EventEmitter();

    constructor(private dataService: DataService) {

        dataService.startBlock$.subscribe(
            content => {
                //Non mi interessa del contenuto di content
                //Viene usato solamente per fermare il tasto caricamento in analizza
                if (content == "Blocked") {
                    this.isLoadingAnalisi = true
                } else {
                    this.isLoadingAnalisi = false
                }
            });
    }


    onSelect(user: User): void {
        if (this.selectedUsers.indexOf(user) >= 0) {
            this.remove(this.selectedUsers, user)
        } else {
            this.selectedUsers.push(user)
        }
    }

    clickedInvia() {
        // this.isLoadingAnalisi = true
        this.onInvia.emit(this.selectedUsers)
    }

}
