import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as io from 'socket.io-client';
import { CustomerService } from '../../customer/customer.service';
import { Order } from '../currentorder/Order';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  vendorId : String ;
  orderId : String ;
  socket: SocketIOClient.Socket;
  order : any ;
  // rejected : boolean = true;
  pending : boolean = true;
  rejected : boolean = false;
 // pending : boolean = false;
  accepted : boolean = false;
 // accepted : boolean = false;
  completed : boolean = false;
  orderStatus : string;
  timercountdown : string;
  totalwaitingtime : Number = 1200;

  constructor(private _customerService : CustomerService, private route: ActivatedRoute, private router: Router, private location : Location, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
    this.socket = io.connect(environment.socketURL);
  }

  ngOnInit() {
    this.route.params.forEach(
      (params: Params) => {
        this.vendorId = params['vendorId'];
        this.orderId = params['orderId'];
      }
    );

    // this.toastr.success('Your order has been accepted.', null, {enableHTML: true});
    // this.toastr.info('Order is now ready.');
    // this.toastr.error('Oops! your order has been rejected.');
    
    this._customerService.getOrder(this.orderId).subscribe(
      (data: any) => {
        this.order = data[0];
        this.orderStatus=this.order.orderStatus;
        if (this.orderStatus == 'rejected') {
          this.pending = false;
        // this.pending = true;
          this.rejected = true;
        // need to add other condition
        } else if (this.orderStatus == 'accepted') {
          this.pending = false;
          this.accepted = true;
        } else if (this.orderStatus == 'completed'){
          this.pending = false;
          this.completed = true;
        }
      },
      err => console.log(err)
    );
   
    console.log(this.socket);
    this.socket.emit('order-placed', {
      msg: 'Order Placed'
    });    

    this.socket.on('order-rejected-client', (data: any) => {
      console.log(data.msg);
      if(data.msg==this.orderId){
        this.pending = false;
        this.rejected = true;
        this.toastr.error('Oops! your order has been rejected.', null, {toastLife: 10000});
       // localStorage.setItem('orderstatus','rejected');
      }
    });

    this.socket.on('timer-completed-client', (data: any) => {
      console.log(data.msg);
      if(data.msg==this.orderId){
      this.completed = true;
      this.accepted = false;
      this.toastr.info('Order is now ready.', null, {toastLife: 10000});
      }
      // console.log(this.completed);
     // localStorage.setItem('orderstatus','completed');
     this.order.orderStatus='completed';
     this._customerService.updateOrder(this.order).subscribe(
      (data: any) => { 
        this.socket.emit('after-timecompleted-order', {
          msg: this.order.orderId
        });
      },
      err => console.log(err)
    );
    });

    this.socket.on('order-accepted-client', (data: any) => {
      console.log(data.msg);
      if(data.msg==this.orderId){
        this.toastr.success('Your order has been accepted.', null, {toastLife: 10000});
        this.pending = false;
        this.accepted = true;
        var countDownDate = new Date().getTime()+(20*60*1000);
        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById("demo").innerHTML = hours + "h "
            + minutes + "m " + seconds + "s ";
          // this.timercountdown = hours + "h "
          //   + minutes + "m " + seconds + "s ";
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "EXPIRED";
                this.socket = io.connect(environment.socketURL);
                console.log(this.socket);
                this.socket.emit('timer-completed', {
                  msg: this.order.orderId
                });
               // this.ngOnInit();
            }
        }, 1000);
       
      // localStorage.setItem('orderstatus','accepted');
      }
    });

    this.socket.on('order-completed-client', (data) => {
      console.log(data.msg);
      if(data.msg==this.orderId){
      this.completed = true;
      this.accepted = false;
      this.toastr.info('Order is now ready.', null, {toastLife: 10000});
      }
    });
    
  }

  goBack(){
    this.router.navigate(["/restaurant",this.vendorId]);
  }

  goHome(){
    this.router.navigate(["/home"]);
  }
  
}
