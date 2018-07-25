import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AdminService {

  constructor(private _http: HttpClient){}

  getVendors() {
    return this._http.get(environment.serverURL+'vendor/');
  }

}


