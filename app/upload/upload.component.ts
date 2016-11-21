import {
    Component, OnInit, Input, Output, EventEmitter, animate, transition, style, state,
    trigger, AfterViewInit
} from '@angular/core';
import {Message} from "primeng/components/common/api";
import {DataService, User} from "../data.service";


@Component({
    selector: 'app-home',
    templateUrl: './app/upload/upload.component.html',
    animations: [
        trigger('visibilityChanged', [
            state('shown', style({opacity: 1})),
            state('hidden', style({opacity: 0})),
            transition('hidden => shown', animate('3000ms'))
        ])]
})

export class UploadComponent implements OnInit {
    upload_text = "Inserisci un utente ed un oggetto associato"
    visibility = 'hidden';

    nome_user: string = ""
    nome_oggetto: string = ""

    msgs: Message[] = []
    users: User[]

    disabled = false

    constructor(private dataService: DataService) {

    }

    controlUserObjects(e: any) {
        this.msgs = []
        this.disabled = false
        console.log(e)
        console.log(this.nome_user.toLowerCase())
        console.log(this.nome_oggetto.toLowerCase())

        let found = false
        if (this.users) {
            for (let u of this.users) {
                if (u.nome_user.toLowerCase().replace(/\s/g, '') == this.nome_user.toLowerCase()) {
                    for (let o of u.oggetti) {
                        if (this.nome_oggetto.toLowerCase().replace(/\s/g, '') == o.nome_oggetto.toLowerCase()) {
                            found = true
                            break;
                        }
                    }
                }
            }
        }
        if (found) {
            this.msgs.push({
                severity: 'error',
                summary: 'Combinazione presente',
                detail: 'Cambia oggetto o utente'
            });
            this.disabled = true
        }
    }

    ngOnInit() {
        this.users = this.dataService.getUsers()
        this.visibility = 'shown'

    }

    onBeforeUpload(e: any) {
        let found = false

        if (this.users) {
            for (let u of this.users) {
                if (u.nome_user.toLowerCase() == this.nome_user.toLowerCase()) {
                    for (let o of u.oggetti) {
                        if (this.nome_oggetto.toLowerCase() == o.nome_oggetto.toLowerCase()) {
                            found = true
                            break;
                        }
                    }
                }
            }
        }
        if (found) {
            this.msgs.push({
                severity: 'error',
                summary: 'Combinazione presente',
                detail: 'Cambia oggetto o utente'
            });
        }
        else {
            if (!this.nome_user || this.nome_user.length == 0
                || !this.nome_oggetto || this.nome_oggetto.length == 0) {
            } else {
                e.formData.append('nome_user', this.nome_user);
                e.formData.append('nome_oggetto', this.nome_oggetto);
            }
        }
    }

}
