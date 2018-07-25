import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { DataService } from "../sharedservice/data.service";
import { RegisteredVendor } from '../signupandlogin-forms/registrationform';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form-new.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginComponent implements OnInit{

  socket: SocketIOClient.Socket;
  partnerId : string = '';
  password : string = '';
  invalidCredentials : boolean = false;
  registrationDetail : RegisteredVendor;

  user : any = {};

  constructor(private _registrationService: RegistrationService, private dataService: DataService, private route: ActivatedRoute, private router: Router, private _authService : AuthService) { 
    this.socket = io.connect(environment.socketURL);
  }

  ngOnInit(){

  }

  login(partnerId, password){
    if(partnerId==''){
      document.getElementById('partnerId').style.borderColor='red';
      return false;
    }
    if(password==''){
      document.getElementById('password').style.borderColor='red';
      return false;
    }
    let loggedInUser = {
      partnerId: partnerId,
      password
    };
    this._registrationService.checkLoggedInUser(loggedInUser).subscribe(
      (test: any) => {
        if (test.length != 0) {
          this.registrationDetail = test[0];
         // console.log("Form Value = " + JSON.stringify(this.registrationDetail, null, 4));
          if (this.registrationDetail.userType == 'vendor') {
            console.log('I am a vendor');
            localStorage.setItem('currentUser',loggedInUser.partnerId);
            this.dataService.loggedInPartnerId(this.partnerId);
            this.router.navigate(['vendorhome',this.partnerId]);
            this.socket.emit('logged-in-user', {
              msg: this.partnerId
            });
          } else if (this.registrationDetail.userType == 'admin') {
            console.log('I am an admin');
            this.socket.emit('logged-in-user', {
              msg: this.partnerId
            });
            this.router.navigate(['food-stall-vendors']);
          } else{
            console.log('Invalid usertype');
            this.invalidCredentials = true;
            return;
          }
        } else {
          console.log('Invalid credentials');
          this.invalidCredentials = true;
          return;
        }
      },
      err => console.log(err)
    );
  }

  onKey(event: any) {
    //console.log(event.target.name);
    let name = event.target.name;
    this.invalidCredentials=false;
    if(name == 'partnerId'){
      document.getElementById('partnerId').style.borderColor='black';
    }
    if(name == 'password'){
      document.getElementById('password').style.borderColor='black';
    }
  }

  connectWithGoogle(){
    this._authService.signInWithGoogle().then(
      (data) => {
       console.log('****************'+JSON.stringify(data, null, 4));
       console.log(data.user.uid);
        //  console.log("Form Value = " + JSON.stringify(formValue, null, 4));

        // "user": {
        //   "uid": "yBIgM642igQwwO2iGWWc1Pyzc202",
        //   "displayName": "Resta Limited",
        //   "photoURL": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
        //   "email": "noreply.restapvtlimited@gmail.com",
        //   "emailVerified": true,
        //   "phoneNumber": null,
        //   "isAnonymous": false,
        let newRegisterdUser = {
          firstName: data.user.displayName,
          lastName: '',
          email: data.user.email,
          password: '',
          phone: data.user.phoneNumber,
          location: ''
      };
      localStorage.setItem('operationType', data.operationType);
      console.log(localStorage.getItem('operationType'));
      // console.log(newRegisterdUser);
      // this._registrationService.saveRegisteredUser(newRegisterdUser).subscribe(
      //     (test: any) => {

      //     },
      //     err => console.log(err)
      // );
       localStorage.setItem('currentUser',data.user.uid);
       this.socket.emit('logged-in-user', {
        msg: data.user.uid
      });
      this.socket.emit('operation-type', {
        msg: data.operationType
      });
       this.router.navigate(['/vendorhome',data.user.uid]);
      }
    );
  }

}