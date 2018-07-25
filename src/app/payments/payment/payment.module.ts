import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../payment.service';
import { MakePaymentComponent } from '../make-payment/make-payment.component';
import { routing } from './payment.routing';

import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,                 
    AngularFireAuthModule    
  ],
  exports : [
    MakePaymentComponent
  ],
  declarations: [MakePaymentComponent],
  providers: [PaymentService]
})
export class PaymentModule { }
