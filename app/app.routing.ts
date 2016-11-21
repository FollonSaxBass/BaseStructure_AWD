import {NgModule}      from '@angular/core';
import {RouterModule, Routes}   from '@angular/router';

import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {PlotComponent} from "./plot/plot.component";
import {AnalisiComponent} from "./analisi/analisi.component";
import {userList} from "./plot/userList/userList.component";
import {objectList} from "./plot/objectList/objectList.component";
import {ChartComponent} from "./plot/chart/chart.component";
import DynamicComponent from "./plot/chart/dynamic.component";
import {userListAns} from "./analisi/userListAns/userListAns.component";
import {objectListAns} from "./analisi/objectListAns/objectListAns.component";
import {correlationSingle} from "./analisi/correlationSingle/correlationSingle.component";
import DynamicComponentAns from "./analisi/correlationSingle/dynamic_ans.component";
import {correlationTableSingle} from "./analisi/correlationSingle/correlationTableSingle.component";
import {AnalisiMultiplaComponent} from "./analisi_multipla/analisi_multipla.component";
import {objectListAnm} from "./analisi_multipla/objectListAnm/objectListAnm.component";
import {columnListAnm} from "./analisi_multipla/columnListAnm/columnListAnm.component";
import {userListAnm} from "./analisi_multipla/userListAnm/userListAnm.component";
import {correlationMultiple} from "./analisi_multipla/correlationMultiple/correlationMultiple.component";
import DynamicComponentAnm from "./analisi_multipla/correlationMultiple/dynamic_anm.component";
import {UploadComponent} from "./upload/upload.component";

/**
 * Vengono definiti tutti i path ai componenti principali
 * Routing di Angular 2
 *
 * */
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'plot',
        component: PlotComponent
    },
    {
        path: 'analisi',
        component: AnalisiComponent
    },
    {
        path: 'analisi_multipla',
        component: AnalisiMultiplaComponent
    }, {
        path: 'upload',
        component: UploadComponent
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}

/**
 * Componenti da importare in app.module.ts
 *
 * */
export const routingComponents = [HomeComponent, PlotComponent, AnalisiComponent,
    userList, objectList, ChartComponent, DynamicComponent, userListAns, objectListAns,
    correlationSingle, DynamicComponentAns, correlationTableSingle, AnalisiMultiplaComponent,
    objectListAnm, columnListAnm, userListAnm, correlationMultiple, DynamicComponentAnm, UploadComponent]