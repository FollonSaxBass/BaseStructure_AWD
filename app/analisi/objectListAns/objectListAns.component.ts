import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {DataService, User, Oggetto} from "../../data.service";

@Component({
    selector: 'object-list-ans-plot',
    templateUrl: './app/analisi/objectListAns/objectListAns.component.html'
})

export class objectListAns implements OnChanges {

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

    ngOnChanges(changes: SimpleChanges): void {
        this.selectedObject = null
    }

}
