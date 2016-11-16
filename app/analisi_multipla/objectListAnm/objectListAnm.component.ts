import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DataService, User, Oggetto} from "../../data.service";

@Component({
    selector: 'object-list-mul-plot',
    templateUrl: './app/analisi_multipla/objectListAnm/objectListAnm.component.html'
})

export class objectListAnm implements OnInit {

    @Input()
    objects: any;

    selectedObject: Oggetto

    @Output() onSelectedObject = new EventEmitter();

    onSelect(oggetto: Oggetto): void {
        this.selectedObject = oggetto;
    }

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
    }

    clickedInvia(oggetto: Oggetto) {
        this.onSelectedObject.emit(this.selectedObject)
    }
}
