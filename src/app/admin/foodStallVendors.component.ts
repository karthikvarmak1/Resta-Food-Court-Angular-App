import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { FoodStallVendor } from '../food-stall-vendor/foodStallVendor';
import * as lodash from 'lodash';

@Component({
  selector: 'app-food-stall-vendors',
  templateUrl: './foodStallVendors.component.html',
})

export class FoodStallVendorsComponent implements OnInit {
    vendorsList: FoodStallVendor[];
    vendorIds: string[]=[];
    title: string='List of vendors';
    titleFilter: string;
    partnerId: string;
    emptycategories: string;
    listofcategories: string;

  constructor(private _adminService: AdminService) { }

  ngOnInit() {
    this._adminService.getVendors().subscribe(
      (data: any) => {
        this.vendorsList = data;
        console.log("Restaurants Count :" +this.vendorsList.length);
      },
      err => console.log(err)
    );
  }

  categoriesList : string[]=[];
  fetchMenuCategoriesList(vendorId : String){
    this.categoriesList=[];
    console.log(vendorId);
    let fetchedvendor = lodash.find(this.vendorsList, { vendorId : vendorId });
    this.partnerId = fetchedvendor.vendorId;
    console.log(fetchedvendor);
    fetchedvendor.menuCategories.forEach(element => {
      this.categoriesList.push(element.menuCategoryName);
    });
    console.log(this.categoriesList);
    if(this.categoriesList.length!=0){
      this.emptycategories='';
      console.log('listofcategories');
      this.listofcategories='myModal';
    }else{
      this.listofcategories='';
      this.emptycategories='myModal';
      console.log('emptycategories');
    }
    //listofcategories
  }

  closeDialog(){
    var _close = document.getElementById('close_button2');
    _close.click();
  }
  
}

