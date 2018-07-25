import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { VendorService } from '../../food-stall-vendor/vendors.service';
import { Order } from './Order';
import * as io from 'socket.io-client';
import { CustomerService } from '../../customer/customer.service';
import { OrderComponent } from '../order/order.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-currentorder',
  templateUrl: './currentorder.component.html',
  styleUrls: ['./currentorder.component.css']
})

export class CurrentorderComponent implements OnInit {

  orders: Order[] = [];
  vendorId: string;
  socket: SocketIOClient.Socket;

  constructor(private _vendorService: VendorService, private _customerService : CustomerService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
    this.socket = io.connect(environment.socketURL);
  }

  ngOnInit() {
    this.vendorId = localStorage.getItem('currentUser');
    console.log(this.vendorId);
    this._vendorService.getPendingAndAcceptedOrders(this.vendorId).subscribe(
      (data: any) => {
        this.orders = data;
      //  console.log("Orders : "+JSON.stringify(this.orders,null,4));
      },
      err => console.log(err)
    );
    
    // this.socket.on('order-received', (data: any) => {
    //   console.log(data.msg);
    //   this._vendorService.getPendingAndAcceptedOrders(this.vendorId).subscribe(
    //     (data: any) => {
    //       this.orders = data;
    //     //  console.log("Orders : "+JSON.stringify(this.orders,null,4));
    //     },
    //     err => console.log(err)
    //   );
    //     console.log('In socket block');
    //   });

      this.socket.on('after-timecompleted-order-client', (data: any) => {
        console.log(data.msg);
        this._vendorService.getPendingAndAcceptedOrders(this.vendorId).subscribe(
          (data: any) => {
            this.orders = data;
          },
          err => console.log(err)
        );
      });

      this.socket.on('order-placed-client', (data: any) => {
        console.log(data.msg);
        this._vendorService.getPendingAndAcceptedOrders(this.vendorId).subscribe(
          (data: any) => {
            this.toastr.info('You have got a new order!!').then(
              (toast : Toast) => {
                setTimeout(() => {
                  this.toastr.dismissToast(toast);
                }, 10000);
              });
            this.orders = data;
          },
          err => console.log(err)
        );
      });
  }

  rejectOrder(order : Order){
   order.orderStatus='rejected';
  // console.log('test kkk'+JSON.stringify(order,null,4));
    this._customerService.updateOrder(order).subscribe(
      (data: any) => { 
        this.socket.emit('order-rejected', {
          msg: order.orderId
        });
        this._vendorService.getPendingAndAcceptedOrders(this.vendorId).subscribe(
          (data: any) => {
            this.orders = data;
          //  console.log("Orders : "+JSON.stringify(this.orders,null,4));
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    );
   }

  acceptOrder(order : Order){
    order.orderStatus='accepted';
    // console.log('test kkk'+JSON.stringify(order,null,4));
      this._customerService.updateOrder(order).subscribe(
        (data: any) => { 
          this.socket.emit('order-accepted', {
            msg: order.orderId
          });
          this._vendorService.getPendingAndAcceptedOrders(this.vendorId).subscribe(
            (data: any) => {
              this.orders = data;
            //  console.log("Orders : "+JSON.stringify(this.orders,null,4));
            },
            err => console.log(err)
          );
        },
        err => console.log(err)
      );
  }

  markOrderAsReady(order : Order){
    order.orderStatus='completed';
    this._customerService.updateOrder(order).subscribe(
      (data: any) => { 
        this.socket.emit('order-completed', {
          msg: order.orderId
        });
        this._vendorService.getPendingAndAcceptedOrders(this.vendorId).subscribe(
          (data: any) => {
            this.orders = data;
          //  console.log("Orders : "+JSON.stringify(this.orders,null,4));
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    );
  }

}
