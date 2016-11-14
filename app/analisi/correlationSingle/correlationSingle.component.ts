import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DataService, User, Oggetto} from "../../data.service";

@Component({
    selector: 'correlation-single',
    templateUrl: './app/analisi/correlationSingle/correlationSingle.component.html'
})

export class correlationSingle implements OnInit {
    Title = "Matrice di correlazione"

    nomi_colonne = ["ematocrito", "press_min", "press_max", "qualcosa", "last"]
    righe = [
        [1, -0.85, 0.54, 0.38],
        [-0.85, 1, -0.21, -0.24],
        [0.54, -0.21, 1, 0.60],
        [0.38, -0.24, 0.60, 1],
    ];

    real_nomi_colonne = ["ematocrito", "press_min", "press_max", "qualcosa", "last"]
    real_righe = [
        [1, -0.85, 0.54, 0.38],
        [-0.85, 1, -0.21, -0.24],
        [0.54, -0.21, 1, 0.60],
        [0.38, -0.24, 0.60, 1],
    ];
    correlation_vector = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.11]

    // rangeValues: any = [];
    // chartMin = 0;
    // chartMax = 0;
    //
    // realNomiColonne: any = [];
    // realRighe: any = []

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
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
        this.real_righe = righe_da_considerare
        this.righe = righe_da_considerare
    }


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
        console.log(righe_da_considerare)
        this.righe = righe_da_considerare
        this.nomi_colonne = nomi_da_considerare
    }
}
