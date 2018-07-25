import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VendorService } from '../app/food-stall-vendor/vendors.service';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Virtual Food Court';
  socket: SocketIOClient.Socket;
  isAdmin : boolean;
  isVendor : boolean;
  isCustomer : boolean = true;
  vendorId : string;
  profileTabHide : boolean;

  constructor(private _vendorService : VendorService, private router: Router, private route: ActivatedRoute, private _authService : AuthService) { 
    this.socket = io.connect(environment.socketURL);
  }

  ngOnInit() {
    if(localStorage.getItem('userType')=='admin'){
      this.isAdmin=true;
      this.isCustomer=false;
    }else if(localStorage.getItem('userType')=='vendor'){
      this.isVendor=true;
      this.isCustomer=false;
    }
    if(localStorage.getItem('operationType')=='signIn'){
      console.log('*******************');
      this.profileTabHide=true;
    }
    this.socket.on('logged-in-user-client', (data: any) => {
      console.log(data.msg);
      if(data.msg=='admin'){
       this.isAdmin=true;
       this.isCustomer=false;
       localStorage.setItem('userType', 'admin');
      }else{
        this.isVendor=true;
        this.isCustomer=false;
        this.vendorId=data.msg;
        localStorage.setItem('userType', 'vendor');
      }
    });

    this.socket.on('operation-type-client', (data: any) => {
      this.profileTabHide=true;
    });
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.isCustomer=true;
    this.isAdmin=false;
    this.isVendor=false;
    localStorage.removeItem('vendordetails');
    localStorage.removeItem('userType');
    localStorage.removeItem('operationType');
    this._authService.logout();
  }
}
