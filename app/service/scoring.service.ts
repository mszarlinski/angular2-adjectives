import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Scale} from "./../domain/scale";
import {Score} from "./../domain/score";

@Injectable()
export class ScoringService {
    private _score:Score;

    constructor(private http:Http) {
        http.get('app/config/scales.json')
            .subscribe(config => {
                let scales = config.json().scales;
                this._score = new Score(scales);
            });
    }
    
    getInitScore():Score {
        return this._score;
    }

    addPointsForAdjective(adjectiveId:number):Score {
        this._score.scales.forEach(scale => {
            this.handleAdjective(scale, adjectiveId);
        });
        return this._score;
    }

    subPointsForAdjective(adjectiveId:number):Score {
        this._score.scales.forEach(scale => {
            this.handleAdjective(scale, adjectiveId, -1);
        });
        return this._score;
    }

    private handleAdjective(scale:Scale, adjectiveId:number, delta = 1):void {
        if (scale.positive.indexOf(adjectiveId) != -1) {
            this._score.change(scale.id, delta);
        }
        if (scale.negative.indexOf(adjectiveId) != -1) {
            this._score.change(scale.id, -1 * delta);
        }
    }
}
