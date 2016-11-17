import {OnInit, Input, Component, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'correlation-table-columans',
    templateUrl: './app/analisi/correlationSingle/correlationTableSingle.component.html'
})

/**
 * Unisce due tabelle in cui possono essere inserite o tolte le colonne
 */
export class correlationTableSingle implements OnInit {

    /**
     * Funzione per rimuovere un elemento da un array
     * @param arr
     * @param what
     */
    remove(array: any, what: any) {
        var found = array.indexOf(what);

        while (found !== -1) {
            array.splice(found, 1);
            found = array.indexOf(what);
        }
    }

    /**
     * Nomi delle colonne delle tabella
     */
    @Input() nomi_colonne: string[];
    @Output() onSelectedColumnAdd = new EventEmitter();

    // Colonne eliminate
    deleted: Array<any> = [];
    //Colonne da tenere nella matrice di correlazione
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

    /**
     * Metodo per l'aggiunta di una colonna dalla matrice di correlazione presente nel padre
     * Viene comunicato al padre
     * @param sel
     */
    selectColumnAdd(sel: any) {
        this.remove(this.deleted, sel)
        this.dati.push(sel)
        this.onSelectedColumnAdd.emit({dati: this.dati, deleted: this.deleted})
    }

    /**
     * Metodo per la rimozione di una colonna dalla matrice di correlazione presente nel padre
     * Viene comunicato al padre
     * @param sel
     */
    selectColumnRemove(sel: any) {
        this.remove(this.dati, sel)
        this.deleted.push(sel)
        this.onSelectedColumnAdd.emit({dati: this.dati, deleted: this.deleted})
    }
}