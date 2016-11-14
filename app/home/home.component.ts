import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
    selector: 'app-home',
    templateUrl: './app/home/home.component.html'
})

export class HomeComponent implements OnInit {
    homeTitle = "Welcome to the homepage..."

    constructor() {

    }

    ngOnInit() {
    }
}
