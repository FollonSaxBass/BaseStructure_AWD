import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';
import {AppComponent} from './app.component';
import {AppRoutingModule, routingComponents} from './app.routing'
import {DataService} from "./data.service";
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {HttpModule, JsonpModule} from '@angular/http';
import {SliderModule} from 'primeng/primeng';
import {DataTableModule, SharedModule} from 'primeng/primeng';
import {CalendarModule} from "primeng/components/calendar/calendar";
import {GrowlModule} from "primeng/components/growl/growl";
import {LaddaModule} from "angular2-ladda";
import {FilterPipe} from "./filter.pipe";
import {TooltipModule} from "primeng/components/tooltip/tooltip";
import {MessagesModule} from "primeng/components/messages/messages";
import {BusyModule} from "angular2-busy";
import {FileUploadModule} from "primeng/components/fileupload/fileupload";
import {ConfirmationService} from "primeng/components/common/api";
import {ConfirmDialogModule} from "primeng/components/confirmdialog/confirmdialog";

/**
 *Importazione dei moduli a livello di applicazione,
 * notare che si è importato a questo livello anche il servizio(provider) dataService
 * importabile successivamente in tutta l'applicazione
 */
@NgModule({
    declarations: [AppComponent, routingComponents, FilterPipe],
    imports: [
        BrowserModule,
        FormsModule,
        Ng2BootstrapModule,
        AppRoutingModule,
        HttpModule,
        ChartsModule,
        JsonpModule,
        SliderModule,
        DataTableModule,
        SharedModule,
        CalendarModule,
        GrowlModule,
        LaddaModule,
        TooltipModule,
        MessagesModule,
        BusyModule,
        FileUploadModule, ConfirmDialogModule
    ],
    providers: [DataService,ConfirmationService],
    bootstrap: [AppComponent]
})

export class AppModule {
}