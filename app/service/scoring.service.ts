import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Scale} from './../domain/scale';
import {Score} from './../domain/score';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ScoringService {
    private _score:Score;
    private _scales:Array<Scale>;
    
    private _scalesObservable;

    constructor(private http:Http) {
        this._scalesObservable = http.get('app/config/scales.json');

        this._scalesObservable.subscribe(config => {
                this._scales = config.json().scales;
                this._score = new Score(this._scales);
            });
    }

    getInitScore():Observable<Score> {
        return this._scalesObservable.map(config => new Score(config.json().scales));
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

    private handleAdjective(scale:Scale, adjectiveId:number, delta = 1):void {
        if (scale.allPositive) {
            this._score.change(scale.id, delta);
        } else {
            if (scale.positive.indexOf(adjectiveId) != -1) {
                this._score.change(scale.id, delta);
            }
            if (scale.negative.indexOf(adjectiveId) != -1) {
                this._score.change(scale.id, -1 * delta);
            }
        }
    }
}
