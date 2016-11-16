import {
    Component, OnInit, Input, Output, EventEmitter, animate, transition, style, state,
    trigger, AfterViewInit
} from '@angular/core';


@Component({
    selector: 'app-home',
    templateUrl: './app/home/home.component.html',
    animations: [
        trigger('visibilityChanged', [
            state('shown', style({opacity: 1})),
            state('hidden', style({opacity: 0})),
            transition('hidden => shown', animate('3000ms'))
        ])]
})

export class HomeComponent implements OnInit,AfterViewInit {

    homeTitle = "Welcome to...."
    Title = "Data Analysis!"
    visibility = 'hidden';

    constructor() {

    }

    ngOnInit() {

    }

    ngAfterViewInit(): void {
        this.visibility = 'shown'
    }

}
