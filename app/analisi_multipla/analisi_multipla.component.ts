import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {Oggetto, DataService} from "../data.service";

@Component({
    selector: 'analisi-mul-comp',
    templateUrl: './app/analisi_multipla/analisi_multipla.component.html'
})

export class AnalisiMultiplaComponent implements OnInit {
    objects: Oggetto[] = [];
    selectedObject: Oggetto;
    selectedPlotta: any;
    componentData: any = null;

    constructor(private dataService: DataService, private ref: ElementRef) {
    }

    ngOnInit() {
        this.dataService.getObjects().subscribe(
            (data) => {
                for (let oggetto of data) {
                    let new_oggetto = new Oggetto();
                    new_oggetto.id_oggetto = oggetto.id;
                    new_oggetto.nome_oggetto = oggetto.nome;
                    this.objects.push(new_oggetto);
                }
            }
        );
    }

    onSelectedObject(oggetto: Oggetto) {
        this.selectedObject = oggetto
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
