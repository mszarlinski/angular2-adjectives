import {Component} from 'angular2/core';
import {Adjective} from './domain/adjective';
import {Score} from './domain/score'
import {ScoringService} from './service/scoring.service';
import {AdjectivesService} from './service/adjectives.service';
import {Select2} from './select2.directive';
import {ScoreTableComponent} from './scoretable.component';
import {LicenseService} from './service/license.service';

@Component({
    selector: 'adjectives-app',
    templateUrl: 'app/template/home.html',
    providers: [ScoringService, AdjectivesService, LicenseService],
    directives: [Select2, ScoreTableComponent]
})
export class AppComponent {

    public selectedAdjectives:number[] = [];
    public adjectives:Adjective[] = [];
    public score:Score;

    constructor(private _scoringService:ScoringService, private _adjectivesService:AdjectivesService, private _licenseService:LicenseService) {
    }

    ngOnInit() {
        this._licenseService.acquireLicense()
            .subscribe(
                license => this.onLicenseAcquired(license),
                error => this.onNoLicense(error)
            )
    }
    
    private onLicenseAcquired(license:string) {
        this._adjectivesService.getAdjectives()
            .subscribe(data => this.adjectives = data);

        this._scoringService.getInitScore()
            .subscribe(score => this.score = score);
    }
    
    private onNoLicense(error:any) {
        //TODO: show some message
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
