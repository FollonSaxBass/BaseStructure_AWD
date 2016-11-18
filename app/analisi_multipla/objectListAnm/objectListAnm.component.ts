import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DataService, User, Oggetto} from "../../data.service";

@Component({
    selector: 'object-list-mul-plot',
    templateUrl: './app/analisi_multipla/objectListAnm/objectListAnm.component.html'
})

export class objectListAnm {

    @Input() objects: any;

    selectedObject: Oggetto

    @Output() onSelectedObject = new EventEmitter();
    @Output() changedObject = new EventEmitter();

    onSelectObject(oggetto: Oggetto): void {
        this.selectedObject = oggetto;
        this.changedObject.emit(oggetto)
    }

    clickedInvia() {
        this.onSelectedObject.emit(this.selectedObject)
    }
}
