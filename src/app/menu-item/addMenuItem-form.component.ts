import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MenuItem } from './menuItem';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DataService } from "../sharedservice/data.service";
import * as lodash from 'lodash';
import { VendorService } from "../food-stall-vendor/vendors.service";
import { FoodStallVendor } from '../food-stall-vendor/foodStallVendor';
import { MenuCategory } from '../menu-category/menu-category';

@Component({
  selector: 'addMenuItem-form',
  templateUrl: './addMenuItem-form.component.html'
})

export class AddMenuItemFormComponent implements OnInit {
  menuCategoryName: string;
  cuisines: string[] = ['None','North-Indian', 'South-Indian', 'Chinese', 'Italian', 'Arabian', 'Mexican', 'Thai', 'American', 'Snacks',
    'Sandwiches', 'Wraps', 'Pizza', 'Punjabi', 'Desserts', 'Biryani', 'Sea Food', 'Bengali', 'Mexican', 'Salads', 'Kebab'];
  menuItem: any = {};

  vendorDetails: FoodStallVendor = new FoodStallVendor();
  menuCategories: MenuCategory[];
  partnerId: string;
  componentName: string;

  //for developer purpose - hardcoding values
  // itemName = 'Dragon Prawns';
  // price = 200;
  // quantity = 'Half';
  // makingTime = 30;
  // description = 'Dragon Prawns';
  // itemType = 'Non-Veg';
  // cuisine = 'Chinese';

  itemName: string;
  price: number;
  quantity: number;
  makingTime: number;
  description: string;
  itemType: string;
  cuisine: string;

  categoryName: string = '';

  constructor(private dataService: DataService, private _vendorService: VendorService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    if(localStorage.getItem('userType')=='vendor')
    {
      this.partnerId = localStorage.getItem('currentUser');
      console.log('Partner Id in Add menu item (local storage) : ' + this.partnerId);
  
      this._vendorService.getVendor(this.partnerId).subscribe(
        (vendor: FoodStallVendor) => {
          this.vendorDetails = vendor[0];
          //console.log("Form Value = " + JSON.stringify(this.vendorDetails, null, 4));
        },
        err => console.log(err)
      );
    }
    // this.vendorDetails = JSON.parse(localStorage.getItem('vendordetails'));
  }

  onSubmit(formValue: any) {
    var _close = document.getElementById('close_button2');
    _close.click();
    console.log("Form Value = " + JSON.stringify(formValue, null, 4));

    this.dataService.currentMenuCategory.subscribe(name => this.categoryName = name);
    this.dataService.currentComponent.subscribe(name => this.componentName = name);

    this._vendorService.getVendor(this.partnerId).subscribe(
      (vendor: FoodStallVendor) => {
        this.vendorDetails = vendor[0];
        console.log("Form Value = " + JSON.stringify(this.vendorDetails, null, 4));
        this.menuCategories = this.vendorDetails.menuCategories;
        if (lodash.find(this.menuCategories, { menuCategoryName: this.categoryName })) {
          lodash.find(this.menuCategories, { menuCategoryName: this.categoryName }).menuItems.push(formValue);
        } else {
          let newMenuItemWithCategory = {
            menuCategoryName: this.categoryName,
            menuItems: [
              formValue
            ]
          };
          this.menuCategories.push(newMenuItemWithCategory);
        }
        console.log("Form Value Test = " + JSON.stringify(this.vendorDetails, null, 4));
        localStorage.setItem('vendordetails', JSON.stringify(this.vendorDetails));
        this._vendorService.updateVendor(this.vendorDetails).subscribe(
          (data: any) => {
            if ("MenuItemsComponent" == this.componentName) {
              // this.router.navigate(['viewitems',this.categoryName]);
              setTimeout(function () {
                window.location.reload();
              }, 1000);
            }
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    );

  }

}