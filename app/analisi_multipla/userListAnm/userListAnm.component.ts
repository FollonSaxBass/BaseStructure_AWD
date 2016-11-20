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

    @Input() isLoading: boolean
    @Input() users: any;
    @Input() selectedColumn: any;

    selectedUsers: User[] = []

    @Output() onInvia = new EventEmitter();

    onSelect(user: User): void {
        if (this.selectedUsers.indexOf(user) >= 0) {
            this.remove(this.selectedUsers, user)
        } else {
            this.selectedUsers.push(user)
        }
    }

    clickedInvia() {
        this.onInvia.emit(this.selectedUsers)
    }

}
