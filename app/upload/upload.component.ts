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
        // trigger('visibilityChanged', [
        //     state('shown', style({opacity: 1})),
        //     state('hidden', style({opacity: 0})),
        //     transition('hidden => shown', animate('300ms ease-in')),
        //     transition('shown => hidden', animate('300ms ease-out'))
        // ]),
        trigger('visibilityChanged', [
            state('shown', style({transform: 'translateX(0)', opacity: 1})),
            state('hidden', style({transform: 'translateX(100%)', opacity: 0})),
            transition('hidden => shown', [
                style({transform: 'translateX(-100%)'}),
                animate(400)
            ]),
            transition('shown => hidden', [
                animate(400, style({transform: 'translateX(100%)'}))
            ])
        ])]
})
export class UploadComponent implements OnInit,AfterViewInit {
    upload_text = "Inserisci un utente ed un oggetto associato"
    visibility = 'hidden';

    nome_user: string = ""
    nome_oggetto: string = ""

    msgs: Message[] = []
    message_success: Message[] = []
    users: User[]

    disabled = false
    dato: any[]

    constructor(private dataService: DataService) {

    }

    ngOnInit() {
        this.dataService.getDati().subscribe(
            (data) => {
                console.log(data)
                this.dato = data
            });
        this.users = this.dataService.getUsers()
    }

    ngAfterViewInit(): void {
        this.visibility = 'shown'
    }

    controlUserObjects(e: any) {
        this.msgs = []
        this.disabled = false

        let found = false
        if (this.users) {
            for (let u of this.users) {
                if (u.nome_user.toLowerCase().replace(/\s/g, '') == this.nome_user.toLowerCase().replace(/\s/g, '')) {
                    for (let o of u.oggetti) {
                        if (this.nome_oggetto.toLowerCase().replace(/\s/g, '') == o.nome_oggetto.toLowerCase().replace(/\s/g, '')) {
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


    onUpload(e: any) {
        console.log(e)
        this.visibility = 'shown';
        this.dataService.loadUsers()
        this.nome_oggetto = ""
        this.nome_user = ""
        this.message_success.push({
            severity: 'success',
            summary: 'Upload riuscito!',
            detail: 'Utente ed oggetti inseriti, vai in "Plotta" per visualizzare i dati inseriti :D'
        });
    }

    onError(e: any) {
        this.visibility = 'shown';
        console.log(e)
        this.message_success.push({
            severity: 'error',
            summary: 'OOOOOooooopsssssss!',
            detail: 'Qualcosa è andato storto, ritenta l\'upload'
        });
    }

    onBeforeUpload(e: any) {
        this.visibility = 'hidden';
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
                e.formData.append('username', this.nome_user);
                e.formData.append('objectname', this.nome_oggetto);
            }
        }
    }

}
