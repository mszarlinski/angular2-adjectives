import {Component, Input} from 'angular2/core';
import {Score} from './domain/score';
import {ScoreExportService} from './service/scoreExport.service';

@Component({
    selector: 'score-table',
    templateUrl: 'app/template/scoretable.html',
    providers: [ScoreExportService]
})
export class ScoreTableComponent {

    @Input() public score:Score;

    constructor(private _scoreExportService:ScoreExportService) {
    }

    exportToCsv():void {
        this.exportTemplate(this._scoreExportService.createBlobCsv, '.csv');
    }

    exportToTxt():void {
        this.exportTemplate(this._scoreExportService.createBlobTxt, '.txt');
    }

    private exportTemplate(blobFactoryFun:(s:Score)=>Blob, fileExt:string):void {
        let userName:string = this.askForUserName();
        if (userName) {
            let blob:Blob = blobFactoryFun.bind(this._scoreExportService)(this.score);
            let filename:string = ScoreTableComponent.generateFileName(userName, fileExt);
            this.doExport(blob, filename);
        }
    }

    private askForUserName():string {
        return prompt('Podaj imię i nazwisko', 'Jan Kowalski');
    }

    private doExport(blob:Blob, filename:string) {
        if (navigator.msSaveBlob) {
            // IE10+
            navigator.msSaveBlob(blob, filename)
        } else {
            // crete link and click it
            let link:HTMLAnchorElement = document.createElement('a');
            if (ScoreTableComponent.html5DownloadEnabled(link)) {
                let url:string = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    private static html5DownloadEnabled(link:HTMLAnchorElement) {
        return link.hasOwnProperty('download') !== undefined; // download property is missing in d.ts file
    }

    private static generateFileName(userName:string, fileExt:string) {
        let date:Date = new Date();
        let yyyy:string = date.getFullYear().toString();
        let MM:string = (date.getMonth() + 1).toString();
        let dd:string = date.getDate().toString();
        let hh:string = date.getHours().toString();
        let mm:string = date.getMinutes().toString();
        let suffix:string = yyyy + (MM[1] ? MM : "0" + MM[0]) + (dd[1] ? dd : "0" + dd[0]) + '_' + (hh[1] ? hh : "0" + hh[0]) + (mm[1] ? mm : "0" + mm[0]);
        let userData:string = userName.replace(' ', '_');
        
        return 'Wyniki_' + userData + '_' + suffix + fileExt;
    }
}
