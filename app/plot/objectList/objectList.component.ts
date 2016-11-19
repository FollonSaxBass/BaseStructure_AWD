import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {DataService, User, Oggetto} from "../../data.service";
import {Message} from "primeng/components/common/api";

@Component({
    selector: 'object-list-plot',
    templateUrl: './app/plot/objectList/objectList.component.html'
})

export class objectList implements OnChanges {
    msgs: Message[] = [];
    error = false

    //User ricevuto dal padre
    @Input() user: User;

    selectedObject: Oggetto

    //Elementi per comunicare col padre
    @Output() onSelectedObject = new EventEmitter();
    @Output() onSelectedPlotta = new EventEmitter();
    @Output() onReload = new EventEmitter();

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


    constructor(private dataService: DataService) {
        dataService.plotSource$.subscribe(
            content => {
                if (content == "Errore0") {
                    this.error = true
                    this.msgs.push({
                        severity: 'error',
                        summary: 'Connectivity error',
                        detail: 'Check your connectivity and retry'
                    });
                } else if (content == "Errore") {
                    this.error = true
                    this.msgs.push({severity: 'error', summary: 'Server error', detail: 'Something\'s gone wrong'});
                }

            });
    }

    reLoad() {
        this.msgs = []
        this.error = false
        this.onReload.emit()
        this.onSelectedPlotta.emit()
    }

}
