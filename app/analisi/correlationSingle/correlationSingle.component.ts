import {
    Component, OnInit, Input, Output, EventEmitter, trigger, state, style, transition,
    animate, Injector
} from '@angular/core';
import {DataService, User, Oggetto} from "../../data.service";

@Component({
    selector: 'correlation-single',
    templateUrl: './app/analisi/correlationSingle/correlationSingle.component.html',
    animations: [
        trigger('visibilityChanged', [
            state('shown', style({opacity: 1})),
            state('hidden', style({opacity: 0})),
            // transition('hidden => shown', animate('400ms ease-in')),
            transition('hidden => shown', [
                style({transform: 'translateY(+100%)'}),
                animate(400)
            ]),
        ])]
})

export class correlationSingle implements OnInit {
    // Nomi delle colonne da visualizzare
    nomi_colonne: Array<any> = [];

    // Righe da visualizzare
    righe: Array<any> = [];

    // Nomi e righe totali, usato per essere disponibili nel caso in cui l'utente selezioni di togliere o mettere un valore
    real_nomi_colonne: Array<any> = [];
    real_righe: Array<any> = [];

    // Vettore di correlazioni usato per costruire la matrice,
    //il vettore rappresenta i componenti in ordine della matrice triangolare alta
    // [0 c0  c1 c2
    //  0  0  c3 c4
    //  0  0  0  c5
    //  0  0  0   0]
    //Vettore di correlazione--> [c0,c1,c2,c3,c4,c5]
    correlation_vector: Array<any> = [];

    // Indice se tutto  è stato caricato
    loaded: boolean;
    visibility = 'hidden';

    selectedUser: User
    selectedObject: Oggetto

    constructor(private dataService: DataService, private injector: Injector) {
        this.selectedUser = this.injector.get('selectedUser');
        this.selectedObject = this.injector.get('selectedObject');
    }

    /**
     * Vado a prendere gli oggetti che mi servono durante l'inizializzazione
     */
    ngOnInit(): void {
        this.dataService.getObjectCorrelation(this.selectedUser.id_user, this.selectedObject.id_oggetto).subscribe(
            (data) => {
                for (let nome_colonna of data.colonne) {
                    this.real_nomi_colonne.push(nome_colonna.toString());
                }

                for (let corr of data.correlazioni) {
                    this.correlation_vector.push(corr);
                }

                let righe_da_considerare: Array<any> = [];
                let _rigaTemp: Array<any> = [];

                let n = this.real_nomi_colonne.length;
                for (let _y = 0; _y < this.real_nomi_colonne.length; _y++) {
                    for (let _x = 0; _x < this.real_nomi_colonne.length; _x++) {
                        if (_x == _y) {
                            _rigaTemp.push(1)
                        } else {
                            if (_x > _y) {
                                _rigaTemp.push(this.correlation_vector[(n * (n - 1) / 2) - (n - _y) * ((n - _y) - 1) / 2 + _x - _y - 1])
                            }
                            if (_x < _y) {
                                _rigaTemp.push(this.correlation_vector[(n * (n - 1) / 2) - (n - _x) * ((n - _x) - 1) / 2 + _y - _x - 1])
                            }
                        }
                    }
                    if (_rigaTemp.length != 0)
                        righe_da_considerare.push(_rigaTemp)
                    _rigaTemp = []
                }
                this.nomi_colonne = this.real_nomi_colonne
                this.real_righe = righe_da_considerare
                this.righe = righe_da_considerare
                this.loaded = true
                this.visibility = 'shown'
                this.dataService.contentSource.next();
            }
        );
    }

    /**
     * Metodo chiamato da uno degli elementi figli
     * se viene aggiunta o tolta una colonna
     * @param e
     */
    onSelectedColumnAdd(e: any) {
        let nomi_passati: Array<any> = [];
        for (let dato of e.dati) {
            nomi_passati.push(dato.colonne)
        }
        let _indexes: Array<any> = [];
        let _i = 0;
        for (let nome_colonna of this.real_nomi_colonne) {
            if (nomi_passati.indexOf(nome_colonna) > -1) {
                _indexes.push(_i)
            }
            _i++
        }
        let nomi_da_considerare: Array<any> = [];
        for (let _n of _indexes) {
            nomi_da_considerare.push(this.real_nomi_colonne[_n])
        }

        let righe_da_considerare: Array<any> = [];
        let _rigaTemp: Array<any> = [];

        for (let _y = 0; _y < this.real_nomi_colonne.length; _y++) {
            for (let _x = 0; _x < this.real_nomi_colonne.length; _x++) {
                if (_indexes.indexOf(_x) > -1 && _indexes.indexOf(_y) > -1) {
                    _rigaTemp.push(this.real_righe[_y][_x])
                }
            }
            if (_rigaTemp.length != 0)
                righe_da_considerare.push(_rigaTemp)
            _rigaTemp = []
        }
        this.righe = righe_da_considerare
        this.nomi_colonne = nomi_da_considerare
    }
}
