import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MenuItem } from './menuItem';
import { DataService } from "../sharedservice/data.service";
import * as lodash from 'lodash';
import { VendorService } from "../food-stall-vendor/vendors.service";
import { FoodStallVendor } from '../food-stall-vendor/foodStallVendor';
import { MenuCategory } from '../menu-category/menu-category';

@Component({
  selector: 'edit-menu-item-form',
  templateUrl: './editMenuItem-form.component.html'
})
export class EditMenuItemFormComponent {

  @Input() menuItem : MenuItem;

  itemName: string;
  quantity: string;
  makingTime: string;
  price: string;
  itemType: string;
  description: string;
  cuisine: string;
  
  cuisines: string[] = ['North-Indian', 'South-Indian', 'Chinese', 'Italian', 'Arabian', 'Mexican', 'Thai', 'American', 'Snacks',
  'Sandwiches', 'Wraps', 'Pizza', 'Punjabi', 'Desserts', 'Biryani', 'Sea Food', 'Bengali', 'Mexican', 'Salads', 'Kebab'];

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  categoryName:string;
  //menuItem: MenuItem;
  partnerId: string;
  changeLog: string[] = [];

  ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
        this.categoryName = params['menuCategoryName'];
        this.itemName = params['itemName'];
      });

      this.dataService.currentPartnerId.subscribe(id => this.partnerId = id);
      
      // hardecoded need to remove
      this.partnerId = 'mastervendor';
      console.log('itemName :'+this.itemName);
      console.log('categoryName :'+this.categoryName);
  }
  
}
