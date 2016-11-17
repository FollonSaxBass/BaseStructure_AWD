import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DataService, User, Oggetto, Colonna} from "../../data.service";
import {Column} from "primeng/components/common/shared";

@Component({
    selector: 'column-list-mul-plot',
    templateUrl: './app/analisi_multipla/columnListAnm/columnListAnm.component.html'
})

export class columnListAnm implements OnInit {

    @Input() columns: Colonna;

    selectedColumn: Column;

    @Output() onSelectedColumn = new EventEmitter();

    onSelect(colonna: Column): void {
        this.selectedColumn = colonna;
        this.onSelectedColumn.emit(this.selectedColumn)
    }

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
    }
}
