import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {User, Oggetto, DataService} from "../data.service";
import {ChartComponent} from "../plot/chart/chart.component";
import {correlationSingle} from "./correlationSingle/correlationSingle.component";


@Component({
    selector: 'analisi-comp',
    templateUrl: './app/analisi/analisi.component.html'
})

export class AnalisiComponent implements OnInit {
    Title = "Analisi component"
    users: User[]

    selectedUser: User;
    selectedObject: Oggetto;
    selectedPlotta: any;

    componentData: any = null;

    constructor(private dataService: DataService, private ref: ElementRef) {
    }


    ngOnInit() {
        this.users = this.dataService.getUsers()
    }

    onSelectedUser(user: User) {
        this.selectedUser = user
    }

    onSelectedObject(oggetto: Oggetto) {
        this.selectedObject = oggetto
    }

    onSelectedPlotta() {

        this.componentData = {
            component: correlationSingle,
            inputs: {
                selectedUser: this.selectedUser,
                selectedObject: this.selectedObject
            }
        };
        this.selectedPlotta = true
    }
}
