import {Injectable} from 'angular2/core';
import {Score} from './../domain/score';

@Injectable()
export class ScoreExportService {

    private csvSeparator = ';';

    createBlobCsv(score:Score):Blob {
        return new Blob([this.scoreToCsv(score)], {'type': 'text/csv;charset=UTF-8'});
    }

    private scoreToCsv(score:Score):string {
        var lines:Array<string> = score.scaleIds.map(scaleId => scaleId + this.csvSeparator + score.scaleNames[scaleId] + this.csvSeparator + score.scalePoints[scaleId]);
        return lines.join('\n');
    }

    createBlobTxt(score:Score):Blob {
        return new Blob([this.scoreToTxt(score)], {'type': 'text/txt;charset=UTF-8'});
    }

    private scoreToTxt(score:Score):string {
        var lines:Array<string> = score.scaleIds.map(scaleId => '[' + scaleId + '] ' + score.scaleNames[scaleId] + ' -> ' + score.scalePoints[scaleId]);
        return lines.join('\n');
    }
}
