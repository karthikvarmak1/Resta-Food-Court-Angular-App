import { Routes, RouterModule } from '@angular/router';

import { MakePaymentComponent } from '../make-payment/make-payment.component';

const paymentRoutes : Routes = [
    { path : 'paymenttest',  component : MakePaymentComponent }    
]

export const routing = RouterModule.forRoot(paymentRoutes);