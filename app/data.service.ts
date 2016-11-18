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
    string_name(){
        return this.nome_colonna;
    }
    constructor() {
        this.values = new Array();
    }
}
export class Oggetto {
    id_oggetto: number;
    nome_oggetto: string;
    columns: Colonna[];
    string_name(){
        return this.nome_oggetto;
    }
    constructor() {
        this.columns = new Array();
    }
}
export class User {
    id_user: number;
    nome_user: string;
    oggetti: Oggetto[];
    string_name(){
        return this.nome_user;
    }
    constructor() {
        this.oggetti = new Array();
    }
}

/**
 * Modello di tutta l'applicazione
 * Possibilmente condiviso da tutti aiuta per le richieste http
 */
@Injectable()
export class DataService {

    /**
     * Prova di caricamenti
     * @param ms
     * @returns {Promise<T>}
     */


        //Array di utenti per il plot, salvati qui in caso di nuova richiesta (Cache)
    users: User[] = new Array();

    //Array di utenti per il plot, salvati qui in caso di nuova richiesta (Cache)
    oggetti: Oggetto[] = new Array();


    contentSource = new Subject();
    content$ = this.contentSource.asObservable();

    /**
     * La prima cosa che fa questo componente è andare a prendere i dati degli utenti perchè caratterizza
     * sia la richiesta di plot che la richiesta di analisi singola
     * Si prendono, in particolare, Utenti e oggetti associati
     * @param http
     */    constructor(private http: Http) {
        //https://awdapi.herokuapp.com/getUser
        //./JSON/plot_prima_risposta.json
        this.http.get('https://awdapi.herokuapp.com/getUser').map(
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

    /**
     * Metodo utilizzato quando si hanno già a disposizione gli Users
     * @returns {User[]}
     */
    getUsers() {
        return this.users;
    }

    //TODO: fare richiesta post dove dice Artio
    /**
     * Richiesta per plottaggio
     * @param id_user
     * @param id_oggetto
     * @returns {Observable<R>}
     */
    getColumns(id_user: number, id_oggetto: number) {
        let toSend = {
            "userid": id_user,
            "objectid": id_oggetto
        }
        console.log(toSend)
        let url = "https://awdapi.herokuapp.com/getTable"
        return this.http.post(url, toSend).map(
            (res) => res.json()
        );

        // if (id_oggetto == 1) {
        //     return this.http.get('./JSON/plot_seconda_risposta.json').map(
        //         (res) => res.json()
        //     );
        // } else {
        //     return this.http.get('./JSON/plot_seconda_risposta2.json').map(
        //         (res) => res.json()
        //     );
        // }
    }

    getObjectCorrelation(id_user: number, id_oggetto: number) {
        let toSend = {
            "userid": id_user,
            "objectid": id_oggetto
        }
        let url = "https://awdapi.herokuapp.com/correlation_matrix_object"
        return this.http.post(url, toSend).map(
            (res) => res.json()
        );
        // return this.http.get('./JSON/JSON_Correlation_Object.json').map(
        //     (res) => res.json()
        // )
    }

    /**
     * TODO: fare richiesta post che chieda gli oggetti per l'analsi multipla
     * TODO: Handling errors!!
     * @returns {Observable<R>}
     */
    getObjects() {
        //https://awdapi.herokuapp.com/getDataObject
        //./JSON/Primo_analisi_multipla.json
        return this.http.get('https://awdapi.herokuapp.com/getDataObject').map(
            (res) => res.json()
        );
    }

    /**
     * TODO: invia richiesta post ad artio con Oggetto di riferimento
     * Metodo utilizzato per avere a disposizione user e colonne associate ad un oggetto
     * @returns {Observable<R>}
     */
    getColumnUsers(id_oggetto: number) {
        let toSend = {
            "objectid": id_oggetto
        }
        let url = "https://awdapi.herokuapp.com/getDataUser"
        return this.http.post(url, toSend).map(
            (res) => res.json()
        );

        // return this.http.get('./JSON/Secondo_analisi_multipla.json').map(
        //     (res) => res.json()
        // );
    }

    // Ci può essere più di un utente
    // Un singolo oggetto
    // Data minima e data massima
    getUserCorrelation(users: any, id_oggetto: number, id_colonna: number, data_min: string, data_max: string) {
        let toSend: any;
        let id_utenti: any = []
        for (let user of users) {
            id_utenti.push(user.id_user)
        }
        if (data_min == null || data_max == null) {
            toSend = {
                "utenti": id_utenti,
                "objectid": id_oggetto,
                "colid": id_colonna,
                "data_min": "",
                "data_max": ""
            }
        } else {
            toSend = {
                "utenti": id_utenti,
                "objectid": id_oggetto,
                "colid": id_colonna,
                "data_min": data_min,
                "data_max": data_max
            }
        }
        let url = "https://awdapi.herokuapp.com/correlation_matrix_user"

        console.log(toSend)
        return this.http.post(url, toSend).map(
            (res) => res.json()
        );
        // return this.http.get('./JSON/Correlazione_con_date_analisi_multipla.json').map(
        //     (res) => res.json()
        // )
    }
}