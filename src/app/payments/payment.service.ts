import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
// import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class PaymentService {

  userId: string;
  
    constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe((auth) => {
        console.log(this.userId);
        // console.log(auth.uid);
        if (auth) this.userId = auth.uid;
        console.log(auth);
      });

    //   firebase.auth().onAuthStateChanged(user => {
    //     if(user) {
    //         console.log(user.uid);
    //     }else{
    //       console.log('No logged data');
    //     }
    // });
    }
  
     processPayment(token: any, amount: number) {
      amount = amount*64.91/100;
       const payment = { token, amount }
       console.log(payment);
       return this.db.list(`/payments/${this.userId}`).push(payment);
     }

}
