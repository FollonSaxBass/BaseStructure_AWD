import {
    Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges,
    ChangeDetectionStrategy
} from '@angular/core';
import {DataService, User, Oggetto, Colonna} from "../../data.service";

@Component({
    selector: 'user-list-an-mul',
    templateUrl: './app/analisi_multipla/userListAnm/userListAnm.component.html'
})

export class userListAnm implements OnInit,OnChanges {
    remove(arr: any, what: any) {
        var found = arr.indexOf(what);

        while (found !== -1) {
            arr.splice(found, 1);
            found = arr.indexOf(what);
        }
    }

    @Input() users: any;
    selectedColumn: any;
    selectedUsers: User[] = []

    @Output() onInvia = new EventEmitter();

    @Input()
    set selColumn(colonna: Colonna) {
        this.selectedColumn = (colonna) || null;
    }


    onSelect(user: User): void {
        if (this.selectedUsers.indexOf(user) >= 0) {
            this.remove(this.selectedUsers, user)
        } else {
            this.selectedUsers.push(user)
        }
    }

    constructor(private dataService: DataService) {
    }

    clickedInvia() {
        this.onInvia.emit(this.selectedUsers)
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: any): void {
        console.log(changes)
    }

}
