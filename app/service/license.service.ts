import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class LicenseService {
    static ACQUIRE_LICENSE_ENDPOINT = "http://license.server/license";

    constructor(private _http:Http) {
    }

    acquireLicense():Observable<string> {
        return this._http.get(LicenseService.ACQUIRE_LICENSE_ENDPOINT).map(license => license.json());
    }
}
