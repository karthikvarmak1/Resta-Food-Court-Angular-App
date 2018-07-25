import { Component, OnInit } from '@angular/core';
// import { VendorService } from './vendors.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FoodStallVendor } from './foodStallVendor';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendorDetails.component.html',
})
export class VendorDetailsComponent implements OnInit {
  vendorDetail: FoodStallVendor;
  title : string='Vendor Details';
  vendorId:string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      console.log(params);
      this.vendorId = params['vendorId'];
      console.log("id is :" + this.vendorId + "---" + params['generatedId']);
      console.log(this.vendorDetail);
    });
  }

}

