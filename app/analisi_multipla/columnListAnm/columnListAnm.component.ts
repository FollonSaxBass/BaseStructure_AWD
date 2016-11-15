import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DataService, User, Oggetto} from "../../data.service";
import {Column} from "primeng/components/common/shared";

@Component({
    selector: 'column-list-mul-plot',
    templateUrl: './app/analisi_multipla/columnListAnm/columnListAnm.component.html'
})

export class columnListAnm implements OnInit {

    @Input()
    object: Oggetto;
    selectedColumn: Column

    onSelect(colonna: Column): void {
        this.selectedColumn = colonna;
    }

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
    }
}
