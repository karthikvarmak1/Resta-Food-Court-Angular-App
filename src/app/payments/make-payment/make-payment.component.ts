import { Component, OnInit, HostListener, Input, OnChanges } from '@angular/core';
import { PaymentService } from '../payment.service';
import { environment } from '../../../environments/environment';
import { SimpleChanges } from '@angular/core';
import { VendorService } from '../../food-stall-vendor/vendors.service';
import { CustomerService } from '../../customer/customer.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit, OnChanges {

  @Input() cart: any;
  @Input() amountPayable: number=0;
  @Input() vendorId: string;

  handler: any;
  amount : number = 0;

  constructor(private paymentSvc: PaymentService, private _vendorService : VendorService, private _customerService : CustomerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: '/assets/images/food-logo.jpg',
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.amount);
        this._customerService.sendOrder(this.cart,this.amountPayable,this.vendorId, token.email);
      }
    });
    console.log('In Payments.......');
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('In Payments.......Changes');
    console.log('on change', changes);
    if(changes.amountPayable){
      this.amount = changes.amountPayable.currentValue*100/64.91;
    } 
  }

  handlePayment(cart, amountPayable, vendorId) {
    var _close = document.getElementById('close_button2');
    _close.click();

    this.handler.open({
      name: 'Resta Food Court',
      excerpt: 'Deposit Funds to Account',
      amount: this.amount
    });
    console.log(cart);
    console.log("vendor is:" + vendorId);
    console.log("amount payable :" + amountPayable);
  }

  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }

}
