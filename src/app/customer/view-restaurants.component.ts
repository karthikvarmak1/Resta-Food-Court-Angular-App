import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { FoodStallVendor } from '../food-stall-vendor/foodStallVendor';
import { MenuCategory } from '../menu-category/menu-category';

@Component({
  selector: 'app-foodstallvendors',
  templateUrl: './view-restaurants.component.html',
})
export class RestaurantsComponent implements OnInit {

  vendors: FoodStallVendor[];
  title: string = 'Restaurants';
  rowsList: any[] = [];
  titleFilter: string;

  constructor(private _customerService: CustomerService) { }

  ngOnInit() {
    localStorage.setItem('cart',JSON.stringify([]));
    localStorage.setItem('cartValue','0');
    this._customerService.getVendors().subscribe(
      (data: any) => {
        this.vendors = data;
        console.log("Restaurants are :")
        console.log(this.vendors);
        for (var i = 0; i < this.vendors.length; i = i + 3) {
          console.log(i);
          var rowElement = [];
          while (rowElement.length < 3) {
            var value = this.vendors[i + rowElement.length];
            if (!value) {
              break;
            }
            rowElement.push(value);
          }
          console.log(rowElement);
          this.rowsList.push(rowElement);
        }
        console.log(this.rowsList);
      },
      err => console.log(err)
    );
  }
}
