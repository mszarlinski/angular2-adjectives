import {Component} from 'angular2/core';
import {Adjective} from './domain/adjective';
import {Score} from './domain/score'
import {ScoringService} from './service/scoring.service';
import {AdjectivesService} from './service/adjectives.service';
import {Select2} from './select2.directive';
import {ScoreTableComponent} from './scoretable.component';

@Component({
    selector: 'adjectives-app',
    templateUrl: 'app/template/home.html',
    providers: [ScoringService, AdjectivesService],
    directives: [Select2, ScoreTableComponent]
})
export class AppComponent {

    public selectedAdjectives:number[] = [];
    public adjectives:Adjective[] = [];
    public score:Score;

    constructor(private _scoringService:ScoringService, private _adjectivesService:AdjectivesService) {
    }

    ngOnInit() {
        this._adjectivesService.getAdjectives()
            .subscribe(data => this.adjectives = data);

        this.score = this._scoringService.getInitScore();
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
