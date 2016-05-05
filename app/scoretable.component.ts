import {Component, Input} from 'angular2/core';
import {Score} from './domain/score';

@Component({
    selector: 'score-table',
    templateUrl: 'app/template/scoretable.html'
})
export class ScoreTableComponent {
    
    @Input() public score:Score;
}
