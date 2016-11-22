import {
    Component, OnInit, Input, Output, EventEmitter, trigger, state, style, transition,
    animate, OnChanges, Injector
} from '@angular/core';
import {DataService, Oggetto, Colonna} from "../../data.service";
var json2csv = require('../../../node_modules/json2csv/dist/json2csv.js');

@Component({
    selector: 'correlation-mul',
    templateUrl: './app/analisi_multipla/correlationMultiple/correlationMultiple.component.html',
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

export class correlationMultiple {
    nomi_colonne: Array<any> = [];
    righe: Array<any> = [];
    real_nomi_colonne: Array<any> = [];
    real_righe: Array<any> = [];
    correlation_vector: Array<any> = [];
    loaded: Boolean;
    visibility = 'hidden';

    @Input() componentData: any

    @Output() onSelectedInvia = new EventEmitter()

    data_min_calc: string;
    data_max_calc: string;

    selectedColumn: Colonna
    selectedObject: Oggetto
    blocked = false;

    isLoadingAnalisi = 'false'
    opacity = 1

    constructor(private dataService: DataService, private injector: Injector) {
        this.real_nomi_colonne = this.injector.get('real_nomi_colonne');
        this.real_righe = this.injector.get('righe_da_considerare');
        this.righe = this.injector.get('righe_da_considerare');
        this.correlation_vector = this.injector.get('correlation_vector');
        this.data_min_calc = this.injector.get('data_min_calc');
        this.data_max_calc = this.injector.get('data_max_calc');
        this.selectedColumn = this.injector.get('selectedColumn');
        this.selectedObject = this.injector.get('selectedObject');

        this.nomi_colonne = this.real_nomi_colonne
        this.loaded = true
        this.visibility = 'shown'

        dataService.startBlock$.subscribe(
            content => {
                //Non mi interessa del contenuto di content
                //Viene usato solamente per fermare il tasto caricamento in analizza
                if (content == "Blocked") {
                    this.isLoadingAnalisi = 'true'
                    this.opacity = 0.3
                } else {
                    this.isLoadingAnalisi = 'false'
                    this.opacity = 1
                }

            });
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
        this.righe = righe_da_considerare
        this.nomi_colonne = nomi_da_considerare
    }

    loadCSV() {
        let fields: string[] = []
        fields.push("#")
        for (let lab of this.nomi_colonne) {
            fields.push(lab)
        }
        let myData: any = [];
        let temp: any
        for (let i = 0; i < this.righe.length; i++) {
            temp = {}
            temp['#'] = this.nomi_colonne[i]
            for (let n = 0; n < this.righe[i].length; n++) {
                temp[this.nomi_colonne[n]] = this.righe[i][n]
            }

            myData.push(temp)
        }
        var result = json2csv({data: myData, fields: fields});
        this.saveData(result, "correlazioneMultipla" + this.selectedObject.nome_oggetto + ".csv")
    }

    saveData(data: any, filename: any) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        // a.style = "display: none";
        var blob = new Blob([data], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    };

}
