import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Order } from '../orders/currentorder/Order';
import { environment } from '../../environments/environment';

@Injectable()
export class CustomerService {

  constructor(private _http: HttpClient, private router : Router) { }

  getVendor(vendorId: any) {
    return this._http.get(environment.serverURL+'vendor/fetch/' + vendorId);
  }

  getVendors() {
    return this._http.get(environment.serverURL+'vendor/');
  }

  saveOrder(newOrder: any) {
    return this._http.post(environment.serverURL+'order/saveorder', newOrder);
  }

  updateOrder(order : any){
    return this._http.put(environment.serverURL+'order/updateorder/' + order.orderId, order);
  }

  getOrder(id: any) {
    return this._http.get(environment.serverURL+'order/fetchorder/' + id);
  }

  sendOrder(cart, amountPayable, vendorId, email) {
    console.log('In send order method of customer service : ');
    // console.log(email);
    let newOrder = {
      vendorId,
      orderDetails: cart,
      //queueNo:1, 
      toPayAmount: amountPayable,
      orderStatus: 'pending',
      orderTime: Date.now(),
      email: email
    };
    this.saveOrder(newOrder).subscribe(
      (data: any) => {
        console.log('Order data : '+JSON.stringify(data,null,4))
        this.router.navigate(['/order/'+vendorId+'/'+data.orderId]);
      },
      err => console.log(err)
    );
  }

}
