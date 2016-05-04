import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Adjective} from './../domain/adjective';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AdjectivesService {
    constructor(private http:Http) {
    }

    getAdjectives():Observable<Adjective[]> {
        return this.http.get('app/config/adjectives.json')
            .map((res:Response) => res.json().adjectives);
    }

}
