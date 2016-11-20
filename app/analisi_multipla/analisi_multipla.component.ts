import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {Oggetto, DataService, User, Colonna} from "../data.service";
import {correlationMultiple} from "./correlationMultiple/correlationMultiple.component";
import {Message} from "primeng/components/common/api";
import {Subscription} from "rxjs";

@Component({
    selector: 'analisi-mul-comp',
    templateUrl: './app/analisi_multipla/analisi_multipla.component.html'
})

export class AnalisiMultiplaComponent implements OnInit {
    busy: Subscription;

    // Liste da mettere nei componenti per poi farle vedere
    objects: Oggetto[];
    columns: Colonna[];
    users: User[];

    selectedObject: Oggetto;
    selectedColumn: Colonna;
    selectedUsers: User[];

    objectSended: Oggetto;

    selectedAnalizza: any;
    componentData: any = null;
    dataSended: any = null

    data_min: any
    data_max: any
    data_min_tosend: any
    data_max_tosend: any

    //Valori di esempio che vengono rimpiazzati al caricamento prima della visualizzazione del component
    minDateValue = new Date(2016, 11, 09)
    maxDateValue = new Date(2016, 11, 09)

    //Utilizzato per inviare messaggio in caso di errore
    message_error: Message[] = [];

    isLoading = false;

    constructor(private dataService: DataService, private ref: ElementRef) {
    }

    ngOnInit() {
        this.dataService.getObjects().subscribe(
            (data) => {
                let tempObj: any = [];
                for (let oggetto of data) {
                    let new_oggetto = new Oggetto();
                    new_oggetto.id_oggetto = oggetto.id;
                    new_oggetto.nome_oggetto = oggetto.name;
                    tempObj.push(new_oggetto)
                }
                this.objects = tempObj;
            }
        );
    }

    changedObject(oggetto: Oggetto) {
        if (this.selectedObject != oggetto) {
            this.selectedObject = oggetto;
            // this.columns = null
            // this.users = null
        }
    }

    onSelectedColumn(colonna: Colonna) {
        this.selectedColumn = colonna
    }

    onSelectedObject(oggetto: Oggetto) {
        if (this.objectSended == oggetto) {
            this.message_error.push({
                severity: 'error', summary: 'AAAAhhh!!', detail: 'Per inviare una nuova richiesta devi ' +
                'selezionare un utente differente'
            })

        } else {
            this.selectedObject = oggetto
            this.objectSended = oggetto
            this.isLoading = true
            this.data_max_tosend = null
            this.data_min_tosend = null
            this.data_min = null
            this.data_max = null
            this.selectedUsers = []
            this.selectedColumn = null

            this.dataService.getColumnUsers(this.selectedObject.id_oggetto).subscribe(
                (data) => {
                    let tempCol: any = [];
                    for (let colonna of data.colonne) {
                        let new_colonna = new Colonna();
                        new_colonna.id_colonna = colonna.id;
                        new_colonna.nome_colonna = colonna.nome;
                        new_colonna.desc = colonna.desc;
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
                    this.isLoading = false
                }
            );
        }
    }

    arraysEqual(a: any, b: any) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    onInvia(users: any) {
        this.isLoading = true
        if (users != null)
            this.selectedUsers = users

        if (this.dataSended != null &&
            this.arraysEqual(this.dataSended.selectedUsers, this.selectedUsers) &&
            this.dataSended.selectedObject == this.selectedObject &&
            this.dataSended.selectedColumn == this.selectedColumn &&
            this.dataSended.data_min_tosend == this.data_min_tosend &&
            this.dataSended.data_max_tosend == this.data_max_tosend) {
            this.message_error.push({
                severity: 'error', summary: 'AAAAhhh!!', detail: 'Per inviare una nuova richiesta devi ' +
                'selezionare un utente, oggetto, attributi o date differenti'
            })
        } else {
            this.dataSended = {
                "selectedUsers": this.selectedUsers.slice(),
                "selectedObject": this.selectedObject,
                "data_min_tosend": this.data_min_tosend,
                "data_max_tosend": this.data_max_tosend,
                "selectedColumn": this.selectedColumn
            }
            this.busy = this.dataService.getUserCorrelation(this.selectedUsers, this.selectedObject.id_oggetto, this.selectedColumn.id_colonna
                , this.data_min_tosend, this.data_max_tosend).subscribe(
                (data) => {
                    let real_nomi_colonne: Array<any> = [];
                    let correlation_vector: Array<any> = [];
                    for (let nome_colonna of data.users) {
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
                    this.data_min = new Date(data.data_min_calc)
                    this.data_max = new Date(data.data_max_calc)
                    this.minDateValue = new Date(data.data_min)
                    this.maxDateValue = new Date(data.data_max)
                    this.data_min_tosend = this.formatDate(this.data_min.getFullYear(), this.data_min.getMonth() + 1, this.data_min.getDate())
                    this.data_max_tosend = this.formatDate(this.data_max.getFullYear(), this.data_max.getMonth() + 1, this.data_max.getDate())

                    this.componentData = {
                        component: correlationMultiple,
                        inputs: {
                            selectedUsers: this.selectedUsers,
                            selectedObject: this.selectedObject,
                            selectedColumn: this.selectedColumn,
                            real_nomi_colonne: real_nomi_colonne,
                            righe_da_considerare: righe_da_considerare,
                            correlation_vector: correlation_vector,
                            data_min_calc: this.formatDate(this.data_min.getFullYear(), this.data_min.getMonth() + 1, this.data_min.getDate()),
                            data_max_calc: this.formatDate(this.data_max.getFullYear(), this.data_max.getMonth() + 1, this.data_max.getDate())
                        }
                    }
                }
            );
            this.selectedAnalizza = true
        }
        this.isLoading = false
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
        this.data_min_tosend = this.formatDate(this.data_min.getFullYear(), this.data_min.getMonth() + 1, this.data_min.getDate())
        this.data_max_tosend = this.formatDate(this.data_max.getFullYear(), this.data_max.getMonth() + 1, this.data_max.getDate())
        this.selectedAnalizza = false
        this.onInvia(null)
    }
}
