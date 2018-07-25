import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from './customer.service';
import { VendorService } from '../food-stall-vendor/vendors.service';
import { FoodStallVendor } from '../food-stall-vendor/foodStallVendor';
import { MenuCategory } from '../menu-category/menu-category';
import { MenuItem } from '../menu-item/menuItem';
import * as lodash from 'lodash';

@Component({
    selector: 'app-viewrestaurant',
    templateUrl: './view-restaurant.component.html',
    styleUrls: ['./view-restaurant.component.css']
})

export class RestaurantComponent {

    isProceedToCheckoutClicked: boolean;
    vendorId: string;
    restaurantMenuCategories: MenuCategory[];
    menuCategoryJson: any = {};
    menuItem: MenuItem;
    // title: string = 'Restaurant';
    cart: any[] = [];
    cartValue: number;
    priceToShow: number;
    checkCart: string = '';
    quantity: number = 0;
    gst: number = 0;
    gstAmount: number = 0;
    amountPayable: number = 0;
    vendorDetails: FoodStallVendor = new FoodStallVendor();

    constructor(private _customerService: CustomerService, private route: ActivatedRoute, private router: Router, private _vendorService: VendorService) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            console.log(params);
            this.vendorId = params['vendorId'];
            console.log("id is :" + this.vendorId + "---" + params['vendorId']);
        });

        this._customerService.getVendor(this.vendorId).subscribe(
            (vendor: FoodStallVendor) => {
                this.vendorDetails = vendor[0];
                // console.log("Form Value (view components page) = " + JSON.stringify(this.vendorDetails, null, 4));
                this.restaurantMenuCategories = this.vendorDetails.menuCategories;
                // console.log("Form Value (view components page) = " + JSON.stringify(this.restaurantMenuCategories, null, 4));
            },
            err => console.log(err)
        );

        this.cart = JSON.parse(localStorage.getItem('cart'));
        this.cartValue = parseInt(localStorage.getItem('cartValue'));
        console.log(this.cart);
    }

    /*for adding item to cart ##################################*/

    addToCart(event, categoryName, item_Name) {
        //this.isDis=true;

        if (this.cart.length == 0) {
            // this.restaurantMenuCategories1 = this._customerService.getVendorMenuCategories(this.vendorId);
            this.menuCategoryJson = lodash.find(this.restaurantMenuCategories, { menuCategoryName: categoryName });
            this.menuItem = lodash.find(this.menuCategoryJson.menuItems, { itemName: item_Name });
            // console.log("Form Value (view components page) = " + JSON.stringify(this.menuCategoryJson, null, 4));
            // console.log("Form Value (view components page) = " + JSON.stringify(this.menuItem, null, 4));
            this.menuItem.count = 1;
            this.cart.push(this.menuItem);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            console.log(this.cart[0]);
            this.checkCart = '';
        }
        else {
            this.checkCart = '';
            this.cart = JSON.parse(localStorage.getItem('cart'));
            for (let k = 0; k < this.cart.length; k++) {
                if (this.cart[k].itemName == item_Name) {
                    this.checkCart = 'myModal';
                    return;
                }
            }
            if (this.checkCart != 'myModal') {
                console.log("item does not exist in cart");
                //this.restaurantMenuCategories1 = this._customerService.getVendorMenuCategories(this.vendorId);
                this.menuCategoryJson = lodash.find(this.restaurantMenuCategories, { menuCategoryName: categoryName });
                this.menuItem = lodash.find(this.menuCategoryJson.menuItems, { itemName: item_Name });
                this.menuItem.count = 1;
                this.cart.push(this.menuItem);
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
        }
        this.cartValue = 0;
        this.cart = JSON.parse(localStorage.getItem('cart'));
        for (let k = 0; k < this.cart.length; k++) {
            console.log(this.cartValue + " + " + this.cart[k].price);
            this.cartValue = this.cartValue + this.cart[k].price * this.cart[k].count;
        }
        localStorage.setItem('cartValue', this.cartValue.toString());
        // console.log(this.cart);
        // console.log(this.cartValue);
    }

    /*for caculating price of each item in cart as per quantity*/
    onNumberChanged($event, item_name) {
        this.quantity = $event;
        console.log(this.cart);

        this.menuItem = this.getMenuItemByName(this.restaurantMenuCategories, item_name);
        console.log("--))");
        console.log(this.menuItem);

        //this.cart = JSON.parse(localStorage.getItem('cart'));
        this.cartValue = 0;
        for (let j = 0; j < this.cart.length; j++) {
            // console.log("...." + this.cart.length);
            // console.log(this.cart[j].itemName + "---" + item_name)

            if (this.cart[j].itemName == item_name) {
                if (this.quantity == 0) {
                    const index: number = this.cart.indexOf(this.cart[j]);
                    if (index !== -1) {
                        this.cart.splice(index, 1);
                    }
                    // localStorage.setItem('cart',JSON.stringify(this.cart));
                }
                else {
                    console.log('inside else');
                    this.cart[j].price = this.quantity * this.menuItem.price;
                    this.cart[j].count = this.quantity;
                    //  localStorage.setItem('cart',JSON.stringify(this.cart));
                }
            }
            if (this.cart[j].price) {
                this.cartValue = this.cartValue + this.cart[j].price;
            }
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('cartValue', this.cartValue.toString());
        console.log("cartValue :" + this.cartValue);
        //console.log(this.priceToShow);
    }

    getAmountPayable() {
        // console.log("In amount payable ************88");
        this.isProceedToCheckoutClicked = true;
        this.gst = this.vendorDetails.gst;
        // console.log("gst :" + this.gst);
        this.gstAmount = this.cartValue * this.gst / 100
        // console.log(this.gstAmount)
        this.amountPayable = this.cartValue + this.gstAmount;
    }

    // sendOrderToVendor(cart, amountPayable, vendorId) {
    //     console.log("sending to vendor.." + amountPayable);
    // }

    getMenuItemByName(restaurantMenuCategories, item_Name) {
        for (let i = 0; i < restaurantMenuCategories.length; i++) {
            for (let j = 0; j < restaurantMenuCategories[i].menuItems.length; j++) {
                if (restaurantMenuCategories[i].menuItems[j].itemName == item_Name) {
                    console.log(restaurantMenuCategories[i].menuItems[j].itemName + "---" + item_Name);
                    this.menuItem = restaurantMenuCategories[i].menuItems[j];
                }
            }
        }
        console.log(this.menuItem);
        return this.menuItem;
    }
}

