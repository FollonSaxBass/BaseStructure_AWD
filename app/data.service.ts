import {Injectable, OnInit} from '@angular/core'
import {Http} from '@angular/http'
import 'rxjs/Rx';

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

@Injectable()
export class DataService implements OnInit {

    users: User[] = new Array();

    constructor(private http: Http) {
        this.http.get('./JSON/plot_prima_risposta.json').map(
            (res)=>res.json()
        ).subscribe(
            (data)=> {
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

    getColumns(id_user:number,id_oggetto:number){
        if(id_oggetto==1) {
            return this.http.get('./JSON/plot_seconda_risposta.json').map(
                (res)=>res.json()
            );
        }else{
            return this.http.get('./JSON/plot_seconda_risposta2.json').map(
                (res)=>res.json()
            );
        }
    }

    getUsers() {
        return this.users;
    }

    fetchData() {

    }

    ngOnInit(): void {

    }
}