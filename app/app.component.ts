import {Component, OnInit} from 'angular2/core';
import {Adjective} from './adjective';
import {ScoringService} from './scoring.service';

@Component({
    selector: 'adjectives-app',
    templateUrl: 'app/template/home.html',
    providers: [ScoringService]
})
export class AppComponent {

    public adjectives:Adjective[] = ADJECTIVES;

    constructor(private _scoringService:ScoringService) {

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
