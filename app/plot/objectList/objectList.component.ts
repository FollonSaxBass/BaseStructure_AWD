import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {DataService, User, Oggetto} from "../../data.service";

@Component({
    selector: 'object-list-plot',
    templateUrl: './app/plot/objectList/objectList.component.html'
})

export class objectList implements OnChanges {

    //User ricevuto dal padre
    @Input() user: User;

    selectedObject: Oggetto

    //Elementi per comunicare col padre
    @Output() onSelectedObject = new EventEmitter();
    @Output() onSelectedPlotta = new EventEmitter();

    /***
     * Ogni volta che seleziono un oggetto lo dico al padre
     * @param oggetto
     */
    onSelect(oggetto: Oggetto): void {
        this.selectedObject = oggetto;
        this.onSelectedObject.emit(this.selectedObject)
    }

    /***
     * Comunico al padre che è stato cliccato il plot
     */
    clickedPlotta() {
        this.onSelectedPlotta.emit()
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.selectedObject = null
    }
}
