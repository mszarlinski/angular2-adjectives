import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {Scale} from './scale';

@Injectable()
export class ScoringService {
    private _score:Score;
    private _scales:Array<Scale>;

    constructor(private http:Http) {
        http.get('app/config/scales.json')
            .subscribe(config => this._scales = config.json().scales);
    }

    addPointsForAdjective(adjectiveId:number):Score {
        this._scales.forEach(scale => {
            this.handleAdjective(scale, adjectiveId);
        });
        return this._score;
    }

    subPointsForAdjective(adjectiveId:number):Score {
        this._scales.forEach(scale => {
            this.handleAdjective(scale, adjectiveId, -1);
        });
        return this._score;
    }

    private handleAdjective(scale:Scale, adjectiveId:number, mlt = 1):void {
        if (scale.positive.indexOf(adjectiveId) != -1) {
            this._score[scale.id] += mlt;
        }
        if (scale.negative.indexOf(adjectiveId) != -1) {
            this._score[scale.id] -= mlt;
        }
    }
}
