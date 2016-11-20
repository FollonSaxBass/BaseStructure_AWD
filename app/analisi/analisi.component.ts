import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {User, Oggetto, DataService} from "../data.service";
import {correlationSingle} from "./correlationSingle/correlationSingle.component";
import {Message} from "primeng/components/common/api";

@Component({
    selector: 'analisi-comp',
    templateUrl: './app/analisi/analisi.component.html'
})

/**
 * Component per l'analisi di un singolo oggetto
 */
export class AnalisiComponent implements OnInit {
    //Utenti per la visualizzazione nella user list
    users: User[]

    //Utente e oggetto selezionato per l'analisi di correlazione
    selectedUser: User;
    selectedObject: Oggetto;

    // // Posto a true quando in oggetti si seleziona di analizzare la selezione
    // selectedAnalizza: boolean;

    //Dati da inviare all'oggetto di visualizzazione dell'analisi
    componentData: any = null;

    //Usato per la visualizzazione del bottone ladda per il caricamento
    isLoading = false
    //Utilizzato per inviare messaggio in caso di errore
    message_error: Message[] = [];

    data_min: any;
    data_max: any;

    constructor(private dataService: DataService, private ref: ElementRef) {
        dataService.content$.subscribe(
            content => {
                //Non mi interessa del contenuto di content
                //Viene usato solamente per fermare il tasto caricamento in analizza
                this.isLoading = false
            });
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

    /**
     * Invia la richiesta di analisi di ciò che è stato selezionato
     */
    onSelectedAnalizza() {
        if (this.componentData != null &&
            this.componentData.inputs.selectedUser === this.selectedUser &&
            this.componentData.inputs.selectedObject === this.selectedObject &&
            this.componentData.inputs.data_min === this.data_min &&
            this.componentData.inputs.data_max === this.data_max
        ) {
            //Non inviare la richiesta, manda un messaggio di
            this.message_error.push({
                severity: 'error', summary: 'AAAAhhh!!', detail: 'Per inviare una nuova richiesta devi ' +
                'selezionare un utente o un oggetto differente'
            })
        }
        else {
            this.componentData = {
                component: correlationSingle,
                inputs: {
                    selectedUser: this.selectedUser,
                    selectedObject: this.selectedObject,
                    data_min: this.data_min,
                    data_max: this.data_max
                }
            };
            this.isLoading = true
        }
    }

    onReload() {
        this.componentData = null
    }
}
