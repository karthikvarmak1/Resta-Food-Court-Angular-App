import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as lodash from 'lodash';
import { DataService } from "../sharedservice/data.service";
import { VendorService } from "../food-stall-vendor/vendors.service";
import { FoodStallVendor } from '../food-stall-vendor/foodStallVendor';
import { MenuCategory } from '../menu-category/menu-category';
import { MenuItem } from '../menu-item/menuItem';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
})

export class MenuItemsComponent implements OnInit {
  menuCategoryName: string;
  menuItems: MenuItem[];
  vendorDetails: FoodStallVendor = new FoodStallVendor();
  menuCategories: MenuCategory[];
  partnerId: string;
  menu_Item: MenuItem;
  itemNameBackup: string;

  menuItemNames: string[] = [];

  itemName: string;
  quantity: string;
  makingTime: number;
  price: number;
  itemType: string;
  description: string;
  cuisine: string;
  titleFilter: string;
  userType: string;

  cuisines: string[] = ['North-Indian', 'South-Indian', 'Chinese', 'Italian', 'Arabian', 'Mexican', 'Thai', 'American', 'Snacks',
    'Sandwiches', 'Wraps', 'Pizza', 'Punjabi', 'Desserts', 'Biryani', 'Sea Food', 'Bengali', 'Mexican', 'Salads', 'Kebab'];

  constructor(private dataService: DataService, private _vendorService: VendorService, private route: ActivatedRoute, private router: Router) { 
   // route.params.subscribe(val => this.ngOnInit());
  }

  ngOnInit(): void {

    this.userType = localStorage.getItem('userType');
    console.log(this.userType);
    console.log(this.userType=='vendor');

    this.route.params.forEach(
      (params: Params) => {
        this.partnerId = params['vendorId']
        this.menuCategoryName = params['categoryname'];
      }
    );
    console.log('karthik check End======>>' + this.menuCategoryName);

    // this.dataService.currentPartnerId.subscribe(id => this.partnerId = id);
    // this.partnerId = localStorage.getItem('currentUser');

    console.log('partner Id in add menu item (local storage): ' + this.partnerId);
    this._vendorService.getVendor(this.partnerId).subscribe(
      (vendor: FoodStallVendor) => {
        this.vendorDetails = vendor[0];
     //   console.log("Form Value = " + JSON.stringify(this.vendorDetails, null, 4));
        this.menuCategories = this.vendorDetails.menuCategories;
      //  console.log('testing menu items : ' + JSON.stringify(lodash.find(this.vendorDetails.menuCategories, { menuCategoryName: this.menuCategoryName })));
        if (lodash.find(this.vendorDetails.menuCategories, { menuCategoryName: this.menuCategoryName })) {
          this.menuItems = lodash.find(this.vendorDetails.menuCategories, { menuCategoryName: this.menuCategoryName }).menuItems;
        }
      },
      err => console.log(err)
    );
   
  }

  setMenuItem(menuItem: MenuItem) {
    console.log(menuItem);
    this.itemName = menuItem.itemName;
    this.quantity = menuItem.quantity;
    this.makingTime = menuItem.makingTime;
    this.price = menuItem.price;
    this.itemType = menuItem.itemType;
    this.description = menuItem.description;
    this.cuisine = menuItem.cuisine;
    this.itemNameBackup = menuItem.itemName;
  }

  onSubmit(formValue: any) {
    console.log("Form Value = " + JSON.stringify(formValue, null, 4));
    var itemIndex = lodash.findIndex(this.menuItems, lodash.find(this.menuItems, { itemName: this.itemNameBackup }));
    this.menuItems.splice(itemIndex, 1, formValue);
    //console.log(this.menuItems);
    var categoryIndex = lodash.findIndex(this.menuCategories, lodash.find(this.menuCategories, { menuCategoryName: this.menuCategoryName }));
    this.menuCategories[categoryIndex] = {
      menuCategoryName: this.menuCategoryName,
      menuItems: this.menuItems
    };
    this.vendorDetails.menuCategories = this.menuCategories;
    localStorage.setItem('vendordetails', JSON.stringify(this.vendorDetails));    
    this._vendorService.updateVendor(this.vendorDetails).subscribe(
      (data: any) => '',
      err => console.log(err)
    );
  }

  deleteMenuItem(item_name: string) {
    //  console.log(item_name);
    console.log(this.menuItems);
    lodash.remove(this.menuItems, { itemName: item_name });
    console.log(this.menuItems);
    var categoryIndex = lodash.findIndex(this.menuCategories, lodash.find(this.menuCategories, { menuCategoryName: this.menuCategoryName }));
    this.menuCategories[categoryIndex] = {
      menuCategoryName: this.menuCategoryName,
      menuItems: this.menuItems
    };
    this.vendorDetails.menuCategories = this.menuCategories;
    localStorage.setItem('vendordetails', JSON.stringify(this.vendorDetails));  
    console.log(this.vendorDetails);
    this._vendorService.updateVendor(this.vendorDetails).subscribe(
      (data: any) => '',
      err => console.log(err)
    );
  }

  selectedMenuItems(element: HTMLInputElement) {
    console.log('element value----->' + element.value);
    var position = this.menuItemNames.indexOf(element.value);
    console.log('possition of unticked checkbox : ' + position);
    element.checked ? this.menuItemNames.push(element.value) : this.menuItemNames.splice(position, 1);
    console.log('Selected items : ' + this.menuItemNames);
  }

  deleteMultipleMenuItems() {
    let menuItemsToDelete = this.menuItemNames;
    for (let i = 0; i < menuItemsToDelete.length; i++) {
      lodash.remove(this.menuItems, { itemName: menuItemsToDelete[i] });
      console.log('Menu item with name ' + menuItemsToDelete[i] + ' is deleted');
    }
    var categoryIndex = lodash.findIndex(this.menuCategories, lodash.find(this.menuCategories, { menuCategoryName: this.menuCategoryName }));
    this.menuCategories[categoryIndex] = {
      menuCategoryName: this.menuCategoryName,
      menuItems: this.menuItems
    };
    this.vendorDetails.menuCategories = this.menuCategories;
    localStorage.setItem('vendordetails', JSON.stringify(this.vendorDetails));  
    this._vendorService.updateVendor(this.vendorDetails).subscribe(
      (data: any) => '',
      err => console.log(err)
    );
  }

  sendCategoryName(){
   this.dataService.sendcurrentMenuCategory(this.menuCategoryName);
   this.dataService.sendCurrentComponent("MenuItemsComponent");
  }

}

