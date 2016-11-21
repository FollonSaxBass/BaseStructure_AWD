import {
    Component, OnInit, Input, Output, EventEmitter, animate, transition, style, state,
    trigger, AfterViewInit
} from '@angular/core';
import {Message} from "primeng/components/common/api";


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

export class UploadComponent implements OnInit,AfterViewInit {
    upload_text = "Inserisci un utente ed un oggetto associato"
    visibility = 'hidden';

    nome_user: string;
    nome_oggetto: string;

    msgs: Message[] = []

    constructor() {

    }

    ngOnInit() {
        this.visibility = 'shown'
        this.msgs.push({
            severity: 'error',
            summary: 'Combinazione presente',
            detail: 'Cambia oggetto o utente'
        });
    }

    ngAfterViewInit(): void {

    }

    onBeforeUpload(e: any) {
        if (!this.nome_user || this.nome_user.length == 0
            || !this.nome_oggetto || this.nome_oggetto.length == 0) {
            console.log("STOP")
        } else {
            e.formData.append('nome_user', this.nome_user);
            e.formData.append('nome_oggetto', this.nome_oggetto);
            console.log(e.formData.get('nome_user'))
        }
        console.log("onBeforeUpload called")
    }

}
