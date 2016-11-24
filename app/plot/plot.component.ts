import {Component, OnInit, Output, Input, ElementRef, AfterViewChecked} from '@angular/core';
import {DataService, User, Oggetto} from "../data.service";
import {ChartComponent} from "./chart/chart.component";
import {Message} from "primeng/components/common/api";

@Component({
    selector: 'plot-comp',
    templateUrl: './app/plot/plot.component.html'
})

export class PlotComponent implements OnInit {
    //Lista di utenti da far vedere
    users: User[]

    //Selezioni effettuate
    //Utilizzate anche per decidere se far vedere il/i componente/i successivo/i
    selectedUser: User;
    selectedObject: Oggetto;
    selectedPlotta: any;

    //Usato per la visualizzazione del bottone ladda per il caricamento
    isLoading = false
    isLoadingPlotta = true

    //Utilizzato per mandare tutti i dati per il plot al componente chartComponent
    componentData: any = null;

    //Utilizzato per inviare messaggio in caso di errore
    message_error: Message[] = [];

    constructor(private dataService: DataService, private ref: ElementRef) {
        dataService.content$.subscribe(
            content => {
                //Non mi interessa del contenuto di content
                //Viene usato solamente per fermare il tasto caricamento in plotta
                this.isLoading = false
                this.isLoadingPlotta = false
            });
    }

    /***
     * Metodo lanciato all'avvio del componente, la prima cosa che faccio è reperire gli users
     */
    ngOnInit() {
        this.users = this.dataService.getUsers()
        if (this.users.length > 0) {
            this.isLoadingPlotta = false
        }
    }

    onSelectedUser(user: User) {
        if (user == null) {
            this.isLoadingPlotta = false
        }
        else
            this.selectedUser = user
    }

    onSelectedObject(oggetto: Oggetto) {
        this.selectedObject = oggetto
    }

    /**
     * Metodo chiamato in caso di plottaggio
     * Nel caso oggetto e user selezionati siano gli stessi di prima non viene assolutamente mandata la richiesta di plot
     */
    onSelectedPlotta() {
        if (this.componentData != null &&
            this.componentData.inputs.selectedUser === this.selectedUser &&
            this.componentData.inputs.selectedObject === this.selectedObject) {
            //Non inviare la richiesta, manda un messaggio di
            this.message_error.push({
                severity: 'error', summary: 'AAAAhhh!!', detail: 'Per inviare una nuova richiesta devi ' +
                'selezionare un utente o un oggetto differente'
            })
        }
        else {
            this.componentData = {
                component: ChartComponent,
                inputs: {
                    selectedUser: this.selectedUser,
                    selectedObject: this.selectedObject
                }
            };
            this.selectedPlotta = true
            this.isLoading = true
        }
    }

    onReload() {
        this.componentData = null
    }

    onDelete() {
        this.dataService.deleteObject(this.selectedUser.id_user, this.selectedObject.id_oggetto).subscribe(
            (data) => {
                window.location.reload()
            },
            (error) => {
                console.log(error)
                this.message_error.push({
                    severity: 'error', summary: 'AAAAhhh!!', detail: 'errore durante la cancellazione dell\'oggetto'
                })
                this.dataService.plotSource.next()
            });
    }
}
