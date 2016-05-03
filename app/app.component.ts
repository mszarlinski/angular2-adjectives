import {Component, OnInit} from 'angular2/core';
import {Adjective} from './adjective';
import {ScoringService} from './scoring.service';
import {Select2} from './select2.directive';

@Component({
    selector: 'adjectives-app',
    templateUrl: 'app/template/home.html',
    providers: [ScoringService],
    directives: [Select2]
})
export class AppComponent {

    public selectedAdjectives:number[] = [];
    public adjectives:Adjective[] = ADJECTIVES;

    public score:Score;

    constructor(private _scoringService:ScoringService) {
    }

    itemSelected(adjectiveId:number) {
        this.selectedAdjectives.push(adjectiveId);

        this.score = this._scoringService.addPointsForAdjective(adjectiveId);
    }

    itemDeleted(adjectiveId:number) {
        let index = this.selectedAdjectives.indexOf(adjectiveId);
        this.selectedAdjectives.splice(index, 1);

        this.score = this._scoringService.subPointsForAdjective(adjectiveId);
    }
}

// TODO: angular2-translate
// TODO: move to service
var ADJECTIVES:Adjective[] = [
    {id: 1, name: 'ładny'},
    {id: 2, name: 'wyjątkowy'},
    {id: 3, name: 'brzydki'},
    {id: 4, name: 'interesujący'},
];
