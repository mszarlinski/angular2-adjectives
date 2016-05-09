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
        var blob:Blob = this._scoreExportService.createBlobCsv(this.score);
        var filename:string = ScoreTableComponent.generateFileName('.csv');
        this.doExport(blob, filename);
    }

    exportToTxt():void {
        var blob:Blob = this._scoreExportService.createBlobTxt(this.score);
        var filename:string = ScoreTableComponent.generateFileName('.txt');
        this.doExport(blob, filename);
    }

    private doExport(blob:Blob, filename:string) {
        if (navigator.msSaveBlob) {
            // IE10+
            navigator.msSaveBlob(blob, filename)
        } else {
            // crete link and click it
            var link:HTMLAnchorElement = document.createElement('a');
            if (ScoreTableComponent.html5DownloadEnabled(link)) {
                var url:string = URL.createObjectURL(blob);
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

    private static generateFileName(fileExt:string) {
        var date:Date = new Date();
        var yyyy:string = date.getFullYear().toString();
        var MM:string = (date.getMonth() + 1).toString();
        var dd:string = date.getDate().toString();
        var hh:string = date.getHours().toString();
        var mm:string = date.getMinutes().toString();
        var suffix:string = yyyy + (MM[1] ? MM : "0" + MM[0]) + (dd[1] ? dd : "0" + dd[0]) + '_' + (hh[1] ? hh : "0" + hh[0]) + (mm[1] ? mm : "0" + mm[0]);
        return 'Wyniki_' + suffix + fileExt;
    }
}
