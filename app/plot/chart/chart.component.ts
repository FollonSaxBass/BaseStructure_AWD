import {
    Component, OnInit, Input, Injector, ViewChild
} from '@angular/core';
import {DataService, User, Oggetto, Colonna, Valore} from "../../data.service";
import 'rxjs/Rx';

@Component({
    selector: 'chart',
    templateUrl: './app/plot/chart/chart.component.html'
})

export class ChartComponent implements OnInit {
    colonne: Colonna[] = []

    rangeValues: number[] = [0, 1];
    chartMin = 0
    chartMax = 1

    selectedUser: User;
    selectedObject: Oggetto;

    public lineChartDataTotal: Array<any> = [{data: [0, 0, 0, 0, 0, 0, 0], label: 'eta', fill: false}];
    public lineChartLabelsTotal: Array<any> = [0, 0, 0, 0, 0, 0, 0];

    // this.selectedUser.nome_user.toString()
    // this.selectedObject.nome_oggetto.toString()

    // lineChart
    public lineChartData: Array<any> = [{data: [0, 0, 0, 0, 0, 0, 0], label: 'eta', fill: false}];
    public lineChartLabels: Array<any> = [0, 0, 0, 0, 0, 0, 0];
    public lineChartOptions: any = {
        animation: false,
        responsive: true,
        title: {
            display: true,
            position: 'top',
            text: "Utente: " + "Pippo" + "" +
            "-->Oggetto: " + "Analisi",
            fontSize: 20,
            fontColor: "#444"
        },
        legend: {
            position: 'right',
            labels: {
                padding: 14,
                fontSize: 14,
                fontColor: "#444"
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    minRotation: 45
                }
            }]
        }
    };
    public lineChartColors: Array<any> = [];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    // public randomize(): void {
    //     let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    //     for (let i = 0; i < this.lineChartData.length; i++) {
    //         _lineChartData[i] = {
    //             data: new Array(this.lineChartData[i].data.length),
    //             label: this.lineChartData[i].label,
    //             fill: false
    //         };
    //         for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //             _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    //         }
    //     }
    //     this.lineChartData = _lineChartData;
    // }

    public chartClicked(e: any): void {
    }

    public chartHovered(e: any): void {
    }

    constructor(private dataService: DataService, private injector: Injector) {
        this.selectedUser = this.injector.get('selectedUser');
        this.selectedObject = this.injector.get('selectedObject');
    }

    ngOnInit() {
        this.dataService.getColumns(this.selectedUser.id_user, this.selectedObject.id_oggetto).subscribe(
            (data: any)=> {
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
                    let label = colonna.nome_colonna.toString()
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
            });
    }

    onChange(e: any) {
        console.log(this.lineChartData)
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
        console.log(_lineChartData)
        this.lineChartData = _lineChartData;
    }

}