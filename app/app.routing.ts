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
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}

export const routingComponents = [HomeComponent, PlotComponent, AnalisiComponent,
    userList, objectList, ChartComponent, DynamicComponent, userListAns, objectListAns,
    correlationSingle, DynamicComponentAns, correlationTableSingle]