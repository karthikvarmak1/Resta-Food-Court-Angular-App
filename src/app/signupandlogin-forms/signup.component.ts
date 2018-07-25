import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';
import { RegisteredVendor } from './registrationform';
import { EqualTextValidator } from "angular2-text-equality-validator";
import { RegistrationService } from './registration.service';

@Component({
    selector: 'signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.css']
})

export class SignUpComponent {

    public user: RegisteredVendor;
    // Hardcoded the values for time-being, have to remove later.
    // firstName : string = 'Karthik' ; 
    // lastName : string ='Varma';
    // email : string ='karthikvarma@test.com';
    // password : string = 'varma';
    // confirmPassword : string = 'varma';
    // phone : string ='8499084111';
    // location : string = 'Chennai';

    firstName : string; 
    lastName : string;
    email : string;
    confirmPassword : string;
    phone : string;
    location : string;

    password: string;
    passwordMismatch: boolean = true;

    constructor(private _registrationService: RegistrationService, private route: ActivatedRoute, private router: Router) { }


    ngOnInit() {
        // initialize model here

    }

    onKey(event: any) {
        console.log(event.target.value);
        console.log(this.password);
        if (this.password == event.target.value || event.target.value == '') {
            this.passwordMismatch = false;
        } else {
            this.passwordMismatch = true;
        }
    }

    onSubmit(formValue: any) {
        //  console.log("Form Value = " + JSON.stringify(formValue, null, 4));
        let newRegisterdUser = {
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            email: formValue.email,
            password: formValue.password,
            phone: formValue.phone,
            location: formValue.location
        };
        console.log('Registered user in Angular : ' + JSON.stringify(newRegisterdUser, null, 4));
        this._registrationService.saveRegisteredUser(newRegisterdUser).subscribe(
            (test: any) => this.router.navigate(['registrationsuccess']),
            err => console.log(err)
        );
    }
}
