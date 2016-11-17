import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DataService, User, Oggetto} from "../../data.service";

@Component({
    selector: 'object-list-ans-plot',
    templateUrl: './app/analisi/objectListAns/objectListAns.component.html'
})

export class objectListAns{

    @Input() user: User;

    selectedObject: Oggetto

    @Output() onSelectedObject = new EventEmitter();
    @Output() onSelectedAnalizza = new EventEmitter();

    onSelect(oggetto: Oggetto): void {
        this.selectedObject = oggetto;
        this.onSelectedObject.emit(this.selectedObject)
    }

    clickedAnalizza() {
        this.onSelectedAnalizza.emit()
    }
}
