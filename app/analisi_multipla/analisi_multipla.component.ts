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
        console.log("Registrato")
    }

    onInvia(users: any) {
        this.selectedUsers = users
        console.log("Users-->")
        console.log(this.selectedUsers)

        this.componentData = {
            component: correlationMultiple,
            inputs: {
                selectedUsers: this.selectedUsers,
                selectedObject: this.selectedObject,
                selectedColumn: this.selectedColumn
            }
        };
        this.selectedPlotta = true
    }


    // onSelectedPlotta() {
    //     this.componentData = {
    //         component: correlationSingle,
    //         inputs: {
    //             selectedUser: this.selectedUser,
    //             selectedObject: this.selectedObject
    //         }
    //     };
    //     this.selectedPlotta = true
    // }
}
