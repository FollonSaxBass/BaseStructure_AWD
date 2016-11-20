import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {DataService, User, Oggetto} from "../../data.service";
import {Message} from "primeng/components/common/api";

@Component({
    selector: 'object-list-ans-plot',
    templateUrl: './app/analisi/objectListAns/objectListAns.component.html'
})

export class objectListAns implements OnChanges {
    msgs: Message[] = [];
    error = false

    @Input() user: User;

    selectedObject: Oggetto

    @Output() onSelectedObject = new EventEmitter();
    @Output() onSelectedAnalizza = new EventEmitter();
    @Output() onReload = new EventEmitter();

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

    constructor(private dataService: DataService) {
        dataService.objectSource$.subscribe(
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
        this.onSelectedAnalizza.emit()
    }

}
