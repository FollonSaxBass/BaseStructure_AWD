import {Injectable, OnInit} from '@angular/core'
import {Http} from '@angular/http'
import 'rxjs/Rx';
import {Subject}    from 'rxjs/Subject';

export class Valore {
    val: number;
    timestamp: string;
}
export class Colonna {
    id_colonna: number;
    nome_colonna: string;
    values: Valore[];

    constructor() {
        this.values = new Array();
    }
}
export class Oggetto {
    id_oggetto: number;
    nome_oggetto: string;
    columns: Colonna[];

    constructor() {
        this.columns = new Array();
    }
}
export class User {
    id_user: number;
    nome_user: string;
    oggetti: Oggetto[];

    constructor() {
        this.oggetti = new Array();
    }
}

/**
 * Modello di tutta l'applicazione
 * Possibilmente condiviso da tutti aiuta per le richieste http
 */
@Injectable()
export class DataService implements OnInit {
    //Arrai di utenti fi
    users: User[] = new Array();

    contentSource = new Subject();
    content$ = this.contentSource.asObservable();

    constructor(private http: Http) {
        this.http.get('./JSON/plot_prima_risposta.json').map(
            (res) => res.json()
        ).subscribe(
            (data) => {
                for (let user of data) {
                    let new_user = new User();
                    new_user.id_user = user.id_utente;
                    new_user.nome_user = user.nome_utente;
                    for (let oggetto of user.oggetti) {
                        let new_oggetto = new Oggetto();
                        new_oggetto.id_oggetto = oggetto.id_oggetto;
                        new_oggetto.nome_oggetto = oggetto.nome_oggetto;
                        new_user.oggetti.push(new_oggetto);
                    }
                    this.users.push(new_user);
                }
            }
        );
    }

    //TODO: fare richiesta post dove dice Artio
    getColumns(id_user: number, id_oggetto: number) {
        if (id_oggetto == 1) {
            return this.http.get('./JSON/plot_seconda_risposta.json').map(
                (res) => res.json()
            );
        } else {
            return this.http.get('./JSON/plot_seconda_risposta2.json').map(
                (res) => res.json()
            );
        }
    }

    getObjects() {
        return this.http.get('./JSON/Primo_analisi_multipla.json').map(
            (res) => res.json()
        );
    }

    getUsers() {
        return this.users;
    }

    getColumnUsers() {
        return this.http.get('./JSON/Secondo_analisi_multipla.json').map(
            (res) => res.json()
        );
    }

    getObjectCorrelation() {
        return this.http.get('./JSON/JSON_Correlation_Object.json').map(
            (res) => res.json()
        )
    }

    getUserCorrelation() {
        return this.http.get('./JSON/Correlazione_con_date_analisi_multipla.json').map(
            (res) => res.json()
        )
    }


    ngOnInit(): void {

    }
}