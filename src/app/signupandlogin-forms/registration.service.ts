import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class RegistrationService {

  constructor(private _http: HttpClient) { }

  saveRegisteredUser(newRegisterdUser: any) {
    return this._http.post(environment.serverURL+'register/saveregistration', newRegisterdUser);
  }

  checkLoggedInUser(loggedInUser: any) {
    return this._http.post(environment.serverURL+'register/loginvalidation', loggedInUser);
  }

  getProfileDetails(id: any) {
    return this._http.get(environment.serverURL+'register/fetchprofiledetails/' + id);
  }

  uploadProfile(user : any){
    return this._http.put(environment.serverURL+'register/updateprofile/'+user.partnerId,user);
  }

}