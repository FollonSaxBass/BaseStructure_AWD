import {Component, OnInit, Output, Input, ElementRef} from '@angular/core';
import {DataService, User, Oggetto} from "../data.service";
import {ChartComponent} from "./chart/chart.component";

@Component({
    selector: 'plot-comp',
    templateUrl: './app/plot/plot.component.html'
})

export class PlotComponent implements OnInit {
    Title = "Plot component"
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
            component: ChartComponent,
            inputs: {
                selectedUser: this.selectedUser,
                selectedObject: this.selectedObject
            }
        };
        this.selectedPlotta = true
    }
}
