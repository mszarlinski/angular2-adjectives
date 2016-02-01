import {Injectable} from 'angular2/core';

@Injectable()
export class ScoringService {
    private score:number;


    addScoresForAdjective(adj:string):number {
        return ++this.score;
    }

    subScoresForAdjective(adj:string):number {
        return --this.score;
    }
}
