import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FoodStallVendor } from "../food-stall-vendor/foodStallVendor";
import { environment } from '../../environments/environment';

@Injectable()
export class VendorService {

    constructor(private _http: HttpClient) { }

    saveVendor(vendor: any) {
        return this._http.post(environment.serverURL+'vendor/savevendor', vendor);
    }

    updateVendor(vendor: any) {
        return this._http.put(environment.serverURL+'vendor/updatevendor/' + vendor.vendorId, vendor);
    }

    getVendor(id: any) {
        return this._http.get(environment.serverURL+'vendor/fetch/' + id);
    }

    getVendors() {
        return this._http.get(environment.serverURL+'vendor/');
    }
    
    getPendingOrders(vendorId) {
        return this._http.get(environment.serverURL+'order/fetch/' + vendorId);
    }

    getCompletedOrders(vendorId){
        return this._http.get(environment.serverURL+'order/fetchcompleted/' + vendorId);
    }

    getPendingAndAcceptedOrders(vendorId) {
        return this._http.get(environment.serverURL+'order/fetchpendingoracceptedorders/' + vendorId);
    }
    // [{
    //     itemName: "Paneer Tikka", 
    //     price: 160, 
    //     quantity: "Half", 
    //     makingTime: 30, 
    //     description: "Paneer Tikka", 
    //     cuisine: "American",
    //     itemType: "Veg",
    //     count: 1
    // }]
}
