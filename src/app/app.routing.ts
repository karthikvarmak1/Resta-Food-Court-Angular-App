import { Routes, RouterModule } from '@angular/router';
import { MenuCategoriesComponent } from './menu-category/menuCategories.component';
import { AddMenuItemFormComponent } from './menu-item/addMenuItem-form.component';
import { MenuItemsComponent } from './menu-item/menu-items.component';
import { EditMenuItemFormComponent } from './menu-item/editMenuItem-form.component';
import { AddVendorDetailsComponent } from './food-stall-vendor/addVendorDetails-form.component';
import { VendorDetailsComponent } from './food-stall-vendor/vendorDetails.component';
import { FoodStallVendorsComponent } from './admin/foodStallVendors.component';
import { EditVendorFormComponent } from './admin/editVendor-form.component';
import { AboutComponent } from './about/about.component';
import { SignUpComponent } from './signupandlogin-forms/signup.component';
import { LoginComponent } from './signupandlogin-forms/login.component';
import { RegistrationSuccess } from './signupandlogin-forms/registrationsuccess.component';
import { RestaurantsComponent } from './customer/view-restaurants.component';
import { RestaurantComponent } from './customer/view-restaurant.component'; 
import { OrderComponent } from './orders/order/order.component';
import { CurrentorderComponent } from './orders/currentorder/currentorder.component';
// merge --> 29-03
import { PreviousordersComponent } from './orders/previousorders/previousorders.component';
import { VendorhomeComponent } from './food-stall-vendor/vendorhome/vendorhome.component';
import { ProfileComponent } from './food-stall-vendor/profile/profile.component';
import { ViewprofileComponent } from './food-stall-vendor/viewprofile/viewprofile.component';

const appRoutes: Routes = [
  { path : '', component: RestaurantsComponent },
  { path : 'about', component : AboutComponent },
  { path : 'signup', component : SignUpComponent },
  { path : 'login/vendor', component : LoginComponent},
  { path : 'registrationsuccess', component : RegistrationSuccess},
  { path : 'menu-categories', component: MenuCategoriesComponent },
  { path : 'addItem/:id', component : AddMenuItemFormComponent },
  { path : 'viewitems/:vendorId/:categoryname', component : MenuItemsComponent },
  { path : 'edit-item/:menuCategoryName/:itemName', component: EditMenuItemFormComponent},
  { path : 'vendorDetails/:generatedId', component:VendorDetailsComponent },
  { path : 'food-stall-vendors', component:FoodStallVendorsComponent},
  { path : 'editVendor/:vendorId', component: EditVendorFormComponent},
  { path : 'add-vendor-details/:vendorId', component: AddVendorDetailsComponent},
  { path : 'home', component : RestaurantsComponent },
  { path : 'restaurant/:vendorId', component : RestaurantComponent },
  { path : 'order/:vendorId/:orderId', component : OrderComponent },
  { path : 'currentorders', component : CurrentorderComponent },
  { path : 'previousorders', component : PreviousordersComponent },
  { path : 'vendorhome/:vendorId', component : VendorhomeComponent },
  { path : 'profile/:vendorId', component : ProfileComponent },
  { path : 'viewprofile/:vendorId', component : ViewprofileComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
