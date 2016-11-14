import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DataService, User, Oggetto} from "../../data.service";

@Component({
    selector: 'object-list-plot',
    templateUrl: './app/plot/objectList/objectList.component.html'
})

export class objectList implements OnInit {

    @Input()
    user: User;
    selectedObject: Oggetto

    @Output() onSelectedObject = new EventEmitter();
    @Output() onSelectedPlotta = new EventEmitter();

    onSelect(oggetto: Oggetto): void {
        this.selectedObject = oggetto;
        this.onSelectedObject.emit(this.selectedObject)
    }

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
    }

    clickedPlotta(object:any) {
        this.onSelectedPlotta.emit()
    }
}
