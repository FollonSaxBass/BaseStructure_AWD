import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: `./app/app.component.html`,
})
/**
 * Controller del componente principale, contiene tutti gli altri componenti divisi in sottocomponenti
 */
export class AppComponent {
    isPlotActive = false;
    isDropdownActive = false;
    isAnalisisActive = false;
    isAnalisimActive = false;
    isUploadActive = false;

    constructor() {
    }

    activatePlot() {
        this.isPlotActive = true
        this.isAnalisisActive = false
        this.isAnalisimActive = false
        this.isDropdownActive = false
        this.isUploadActive = false;
    }

    activateAnalisi1() {
        this.isPlotActive = false
        this.isAnalisisActive = true
        this.isAnalisimActive = false
        this.isDropdownActive = true
        this.isUploadActive = false;
    }

    activateAnalisi2() {
        this.isPlotActive = false
        this.isAnalisisActive = false
        this.isAnalisimActive = true
        this.isDropdownActive = true
        this.isUploadActive = false;
    }

    activateUpload() {
        this.isPlotActive = false
        this.isAnalisisActive = false
        this.isAnalisimActive = false
        this.isDropdownActive = false
        this.isUploadActive = true
    }

    deactivateAll() {
        this.isPlotActive = false
        this.isAnalisisActive = false
        this.isAnalisimActive = false
        this.isDropdownActive = false
        this.isUploadActive = false
    }
}