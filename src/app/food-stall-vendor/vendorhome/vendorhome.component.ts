import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FoodStallVendor } from '../../food-stall-vendor/foodStallVendor';
import { VendorService } from "../../food-stall-vendor/vendors.service";

@Component({
  selector: 'app-vendorhome',
  templateUrl: './vendorhome.component.html',
  styleUrls: ['./vendorhome.component.css']
})

export class VendorhomeComponent implements OnInit {

  vendorId: string;
  vendorDetails: FoodStallVendor;
  existingVendor: boolean;
  profileTabHide: boolean;
  constructor(private route: ActivatedRoute, private router: Router, private _vendorService: VendorService) { }

  ngOnInit() {
    this.route.params.forEach(
      (params: Params) => {
        this.vendorId = params['vendorId'];
        console.log(this.vendorId);
        if(this.vendorId==null || this.vendorId=='undefined'){
          this.vendorId=localStorage.getItem('currentUser');
          if(this.vendorId==null || this.vendorId=='undefined'){
            this.router.navigate(['/login/vendor']);
          }
        }
        this._vendorService.getVendor(this.vendorId).subscribe(
          (vendor: any) => {
            // console.log("Form Value = " + JSON.stringify(vendor, null, 4));
            if(vendor.length!=0){
              this.vendorDetails = vendor[0];
              this.existingVendor=true;
              // console.log("Form Value = " + JSON.stringify(this.vendorDetails, null, 4));
            }else{
              console.log('In else block');
              this.existingVendor=false;
            }
          },
          err => console.log(err)
        );
      });
      if(localStorage.getItem('operationType')=='signIn'){
        this.profileTabHide=true;
      }
  }
}
