import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RegisteredVendor } from '../../signupandlogin-forms/registrationform';
import { RegistrationService } from '../../signupandlogin-forms/registration.service';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {

  vendorId : string;
  registrationDetail : RegisteredVendor;

  constructor(private _registrationService : RegistrationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      console.log(params);
      this.vendorId = params['vendorId'];
      console.log("id is :" + this.vendorId + "---" + params['vendorId']);
      this._registrationService.getProfileDetails(this.vendorId).subscribe(
        (data : any) => {
          this.registrationDetail = data[0];
          console.log(JSON.stringify(this.registrationDetail,null,4));
        },
        err => console.log(err)
      );
    });
  }

}
