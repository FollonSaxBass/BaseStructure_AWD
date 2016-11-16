import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: `./app/app.component.html`,
})
export class AppComponent {
    isPlotActive = false;
    isDropdownActive = false;
    isAnalisisActive = false;
    isAnalisimActive = false;

    constructor() {

    }

    activatePlot() {
        this.isPlotActive = true
        this.isAnalisisActive = false
        this.isAnalisimActive = false
        this.isDropdownActive = false
    }

    activateAnalisi1() {
        this.isPlotActive = false
        this.isAnalisisActive = true
        this.isAnalisimActive = false
        this.isDropdownActive = true
    }

    activateAnalisi2() {
        this.isPlotActive = false
        this.isAnalisisActive = false
        this.isAnalisimActive = true
        this.isDropdownActive = true
    }

    deactivateAll() {
        this.isPlotActive = false
        this.isAnalisisActive = false
        this.isAnalisimActive = false
        this.isDropdownActive = false
    }
}