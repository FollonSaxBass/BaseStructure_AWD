import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {Oggetto, DataService, User, Colonna} from "../data.service";
import {correlationMultiple} from "./correlationMultiple/correlationMultiple.component";

@Component({
    selector: 'analisi-mul-comp',
    templateUrl: './app/analisi_multipla/analisi_multipla.component.html'
})

export class AnalisiMultiplaComponent implements OnInit {

    objects: Oggetto[];
    columns: Colonna[];
    users: User[];

    selectedObject: Oggetto;
    selectedColumn: Colonna;


    selectedUsers: User[];

    selectedPlotta: any;
    componentData: any = null;

    data_min: any
    data_max: any

    minDateValue = new Date(2015, 11, 09)
    maxDateValue = new Date(2016, 11, 09)

    constructor(private dataService: DataService, private ref: ElementRef) {
    }

    ngOnInit() {
        this.dataService.getObjects().subscribe(
            (data) => {
                let tempObj: any = [];
                for (let oggetto of data) {
                    let new_oggetto = new Oggetto();
                    new_oggetto.id_oggetto = oggetto.id;
                    new_oggetto.nome_oggetto = oggetto.nome;
                    tempObj.push(new_oggetto)
                }
                this.objects = tempObj;
            }
        );
    }

    onSelectedObject(oggetto: Oggetto) {
        this.selectedObject = oggetto

        //TODO: MANDARE RICHIESTA AD ARTIO CON ID DELL'OGGETTO

        this.dataService.getColumnUsers().subscribe(
            (data) => {
                let tempCol: any = [];
                for (let colonna of data.colonne) {
                    let new_colonna = new Colonna();
                    new_colonna.id_colonna = colonna.id;
                    new_colonna.nome_colonna = colonna.nome;
                    tempCol.push(new_colonna);
                }
                this.columns = tempCol

                let tempUsers: any = [];
                for (let user of data.utenti) {
                    let new_user = new User();
                    new_user.id_user = user.id;
                    new_user.nome_user = user.nome;
                    tempUsers.push(new_user);
                }
                this.users = tempUsers
            }
        );
    }

    onSelectedColumn(colonna: Colonna) {
        this.selectedColumn = colonna
    }

    onInvia(users: any) {
        this.selectedUsers = users

        this.dataService.getUserCorrelation().subscribe(
            (data) => {
                let real_nomi_colonne: Array<any> = [];
                let correlation_vector: Array<any> = [];

                for (let nome_colonna of data.colonne) {
                    real_nomi_colonne.push(nome_colonna.toString());
                }

                for (let corr of data.correlazioni) {
                    correlation_vector.push(corr);
                }

                let righe_da_considerare: Array<any> = [];
                let _rigaTemp: Array<any> = [];
                let n = real_nomi_colonne.length;
                for (let _y = 0; _y < real_nomi_colonne.length; _y++) {
                    for (let _x = 0; _x < real_nomi_colonne.length; _x++) {
                        if (_x == _y) {
                            _rigaTemp.push(1)
                        } else {
                            if (_x > _y) {
                                _rigaTemp.push(correlation_vector[(n * (n - 1) / 2) - (n - _y) * ((n - _y) - 1) / 2 + _x - _y - 1])
                            }
                            if (_x < _y) {
                                _rigaTemp.push(correlation_vector[(n * (n - 1) / 2) - (n - _x) * ((n - _x) - 1) / 2 + _y - _x - 1])
                            }
                        }
                    }
                    if (_rigaTemp.length != 0)
                        righe_da_considerare.push(_rigaTemp)
                    _rigaTemp = []
                }

                this.componentData = {
                    component: correlationMultiple,
                    inputs: {
                        selectedUsers: this.selectedUsers,
                        selectedObject: this.selectedObject,
                        selectedColumn: this.selectedColumn,
                        real_nomi_colonne: real_nomi_colonne,
                        righe_da_considerare: righe_da_considerare,
                        correlation_vector: correlation_vector
                    }
                }

                this.data_min = new Date(data.data_min)
                this.data_max = new Date(data.data_max)
                this.minDateValue = this.data_min
                this.maxDateValue = this.data_max
            }
        );
        this.selectedPlotta = true
    }


    formatDate(yearToFormat: number, monthToFormat: number, dayToFormat: number,) {
        let year = yearToFormat.toString()
        let month: string;
        if (monthToFormat < 10) {
            month = "0" + monthToFormat.toString()
        } else {
            month = monthToFormat.toString()
        }
        let day: string;
        if (dayToFormat < 10) {
            day = "0" + dayToFormat.toString()
        } else {
            day = dayToFormat.toString()
        }

        return year + "-" + month + "-" + day
    }

    aggiornaDate() {
        let data_min_tosend = this.formatDate(this.data_min.getFullYear(), this.data_min.getMonth(), this.data_min.getDay())
        let data_max_tosend = this.formatDate(this.data_max.getFullYear(), this.data_max.getMonth(), this.data_max.getDay())
        let elem = {
            "data_min": data_min_tosend,
            "data_max": data_max_tosend
        }
    }
}
