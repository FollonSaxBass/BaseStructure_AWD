import {OnInit, Input, Component, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'correlation-table-columans-mul',
    templateUrl: './app/analisi_multipla/correlationMultiple/correlationTableMultiple.component.html'
})

export class correlationTableMultiple implements OnInit {

    remove(arr: any, what: any) {
        var found = arr.indexOf(what);

        while (found !== -1) {
            arr.splice(found, 1);
            found = arr.indexOf(what);
        }
    }

    @Input() nomi_colonne: string[];
    @Output() onSelectedColumnAdd = new EventEmitter();

    deleted: Array<any> = [];
    dati: Array<any> = [];

    constructor() {
    }

    ngOnInit() {
        let _dati: Array<any> = [];

        for (let nome of this.nomi_colonne) {
            _dati.push({"colonne": nome})
        }
        this.dati = _dati
    }

    selectColumnAdd(sel: any) {
        this.remove(this.deleted, sel)
        this.dati.push(sel)
        this.onSelectedColumnAdd.emit({dati: this.dati, deleted: this.deleted})
    }

    selectColumnRemove(sel: any) {
        this.remove(this.dati, sel)
        this.deleted.push(sel)
        this.onSelectedColumnAdd.emit({dati: this.dati, deleted: this.deleted})
    }
}