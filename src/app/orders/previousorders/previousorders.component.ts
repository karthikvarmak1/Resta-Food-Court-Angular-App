import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../food-stall-vendor/vendors.service';
import { Order } from '../currentorder/Order';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-previousorders',
  templateUrl: './previousorders.component.html',
  styleUrls: ['./previousorders.component.css']
})

export class PreviousordersComponent implements OnInit {

  orders: Order[] = [];
  vendorId: string;
  socket: SocketIOClient.Socket;

  constructor(private _vendorService: VendorService) {
    this.socket = io.connect(environment.socketURL);
   }

  ngOnInit() {
    this.vendorId = localStorage.getItem('currentUser');
    console.log(this.vendorId);
    this._vendorService.getCompletedOrders(this.vendorId).subscribe(
      (data: any) => {
        this.orders = data;
       // console.log("Orders : "+JSON.stringify(this.orders,null,4));
      },
      err => console.log(err)
    );

    this.socket.on('after-timecompleted-order-client', (data: any) => {
      console.log(data.msg);
      this._vendorService.getCompletedOrders(this.vendorId).subscribe(
        (data: any) => {
          this.orders = data;
        },
        err => console.log(err)
      );
    });
  }

}
