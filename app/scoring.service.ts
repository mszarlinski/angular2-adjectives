import {Injectable} from 'angular2/core';

@Injectable()
export class ScoringService {
    private _score:number = 0;

    addPointsForAdjective(adjectiveId:number):number {
        return ++this._score;
    }

    subPointsForAdjective(adjectiveId:number):number {
        return --this._score;
    }
}
