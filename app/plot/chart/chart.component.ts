import {
    Component, OnInit, Input, Injector, ViewChild, style, state, trigger, animate, transition, AfterViewInit
} from '@angular/core';
import {DataService, User, Oggetto, Colonna, Valore} from "../../data.service";
import 'rxjs/Rx';
import {Message} from "primeng/components/common/api";

@Component({
    selector: 'chart',
    templateUrl: './app/plot/chart/chart.component.html',
    animations: [
        trigger('visibilityChanged', [
            state('shown', style({opacity: 1})),
            state('hidden', style({opacity: 0})),
            transition('hidden => shown', animate('300ms'))
        ])]
})

export class ChartComponent implements OnInit {

    //Lista delle colonne
    colonne: Colonna[] = []

    //Caricamento down csv
    inDownload = false
    // Range values inizializzati a 0,1 per creare la vista,
    // Al caricamento dei dati vengono sostituiti dai valori ritornati dal padre
    // Range values iniziale e finale della range bar per definire il numero di possibili step
    rangeValues: number[] = [0, 1];
    // Chart min e chart max rappresentano lo step minimo e lo step massimo nello slider
    chartMin = 0
    chartMax = 1

    // Vengono trasmessi al grafico dal padre
    selectedUser: User;
    selectedObject: Oggetto;

    // Visibilità di questo oggetto, viene posta a 'shown' quando i dati sono pronti e plottati
    visibility = 'hidden';
    //utilizzato per far vedere il messaggo di successo del plot
    message_ok: Message[] = [];

    //Lista di tutte le proprietà utilizzate per il grafico e le inizializzazioni necessarie!
    //I total sono riferiti a tutti i dati
    public lineChartDataTotal: Array<any> = [{data: [0, 0, 0, 0, 0, 0, 0], label: 'filler', fill: false}];
    public lineChartLabelsTotal: Array<any> = [0, 0, 0, 0, 0, 0, 0];

    //Quelli non Total sono utilizzati per far vedere solamente i dati che interessano all'utente selezionabili tramite lo slider
    public lineChartData: Array<any> = [{data: [0, 0, 0, 0, 0, 0, 0], label: 'filler', fill: false}];
    public lineChartLabels: Array<any> = [0, 0, 0, 0, 0, 0, 0];

    public lineChartOptions: any = {
        animation: false,
        responsive: true,
        // title: {
        //     display: false,
        //     position: 'top',
        //     text: "Utente: " + "Pippo" + "" +
        //     "-->Oggetto: " + "Analisi",
        //     fontSize: 20,
        //     fontColor: "#444"
        // },
        legend: {
            position: 'top',
            labels: {
                padding: 14,
                fontSize: 14,
                fontColor: "#444"
            }
        },
        elements: {
            point: {
                radius: 2
            }
        },
        scales: {
            xAxes: [{

                ticks: {
                    maxTicksLimit: 9,
                    stepSize: 20,
                    minRotation: 45
                }
            }]
        }
    };
    // Colori non inizializzati così inizialmente possono essere a caso
    //TODO: Inizializzare dei colri e dare la possibilità all'utente di selezionare un massimo di colonne
    public lineChartColors: Array<any> = [];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    //Funzioni legate al grafico
    public chartClicked(e: any): void {
    }

    public chartHovered(e: any): void {
    }

    // Il costruttore prende user e oggetto selezionati e li inietta anche nel titolo del pannello del grafico
    constructor(private dataService: DataService, private injector: Injector) {
        this.selectedUser = this.injector.get('selectedUser');
        this.selectedObject = this.injector.get('selectedObject');
    }

    //Durante l'inizializzazione (questo viene eseguito prima di inizializzare la view)
    // Vengono presi tutti i dati per fillare il grafico
    // Mando al metodo l'id dell'utente in modo che possa fare la richiesta giusta
    ngOnInit() {
        this.dataService.getColumns(this.selectedUser.id_user, this.selectedObject.id_oggetto).subscribe(
            (data: any) => {
                for (let column of data.colonne) {
                    let new_column = new Colonna();
                    new_column.id_colonna = column.id_colonna;
                    new_column.nome_colonna = column.nome_colonna;
                    for (let valore of column.valori) {
                        let new_valore = new Valore();
                        new_valore.val = valore;
                        new_column.values.push(new_valore);
                    }
                    let i = 0;
                    for (let time of data.timestamps) {
                        new_column.values[i].timestamp = time;
                        i = i + 1;
                    }
                    new_column.desc = column.desc
                    this.colonne.push(new_column);
                }
                let _lineChartData: Array<any> = new Array(this.colonne.length);
                let _lineChartLabels: Array<any> = [];
                let n = 0
                for (let colonna of this.colonne) {
                    let k = 0
                    let dati: Array<any> = [];
                    for (let valore of colonna.values) {
                        dati.push(valore.val)
                        if (n == 0)
                            _lineChartLabels.push(valore.timestamp)
                        k = k + 1
                    }
                    let label = colonna.nome_colonna.toString() + " (" + colonna.desc.toString() + ")"
                    _lineChartData[n] = {data: dati, label: label, fill: false}
                    n = n + 1
                }
                this.lineChartData = _lineChartData;
                this.lineChartLabels = _lineChartLabels;
                this.lineChartDataTotal = _lineChartData;
                this.lineChartLabelsTotal = _lineChartLabels;
                this.rangeValues = [0, this.lineChartLabels.length - 1]
                this.chartMin = 0
                this.chartMax = this.lineChartLabels.length - 1
                this.visibility = 'shown';
                this.message_ok.push({severity: 'success', summary: 'Plotted!', detail: 'Plot avvenuto con successo'})
                this.dataService.contentSource.next();
            },
            (error) => {
                if (error.status == "0") {
                    //No connettività
                    this.dataService.plotSource.next("Errore0")
                } else {
                    //Altro tipo di errore
                    this.dataService.plotSource.next("Errore")
                }
            });
    }

    // Quando lo slider viene mosso viene chiamato questo metodo che cambia le label ed i dati del grafico
    // (Fantastico :) )
    onChange(e: any) {
        let _lineChartLabels: Array<any> = [];
        for (let i = this.rangeValues[0]; i <= this.rangeValues[1]; i++) {
            _lineChartLabels.push(this.lineChartLabelsTotal[i])
        }
        this.lineChartLabels = _lineChartLabels;

        let _lineChartData: Array<any> = [];
        let n = 0;
        for (let colonna of this.lineChartDataTotal) {
            let dati: Array<any> = [];
            for (let i = this.rangeValues[0]; i <= this.rangeValues[1]; i++) {
                dati.push(colonna.data[i])
            }
            let label = colonna.label.toString();
            _lineChartData[n] = {data: dati, label: label, fill: false};
            n = n + 1
        }
        this.lineChartData = _lineChartData;
    }

    loadCSV() {
        this.inDownload = true;
        this.dataService.getCSVLink(this.selectedUser.id_user, this.selectedObject.id_oggetto,
            this.lineChartLabelsTotal[this.rangeValues[0]], this.lineChartLabelsTotal[this.rangeValues[1]]).subscribe(
            (data) => {
                this.inDownload = false
                var link = document.createElement("a");
                link.download = name;
                link.href = data.url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            (error) => {
                this.inDownload = false
                this.message_ok.push({
                    severity: 'error',
                    summary: 'CSV non scaricato!',
                    detail: 'Problema nel donwnload dei dati'
                })
            });
    }

}