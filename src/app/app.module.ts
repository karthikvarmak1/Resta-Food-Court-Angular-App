import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { AppComponent } from './app.component';
//import { FoodStallVendorComponent } from './food-stall-vendor/food-stall-vendor.component';
// import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { routing } from './app.routing';
// import { MenuCategoryService } from './menu-category/menu-category.service';
import { MenuCategoriesComponent } from './menu-category/menuCategories.component';
// import { AddMenuCategoryFormComponent } from './menu-category/addMenuCategory-form.component';
import { MenuCategoryFilterPipe } from './menu-category/menucategory-filter.pipe';
import { AddMenuItemFormComponent } from './menu-item/addMenuItem-form.component';
import { MenuItemsComponent } from './menu-item/menu-items.component';
import { MenuItemFilterPipe } from './menu-item/menuitem-filter.pipe';
//import { EditMenuCategoryFormComponent } from './menu-category/editMenuCategory-form.component';
import { EditMenuItemFormComponent } from './menu-item/editMenuItem-form.component';
import { AddVendorDetailsComponent } from './food-stall-vendor/addVendorDetails-form.component';
import { VendorDetailsComponent } from './food-stall-vendor/vendorDetails.component';
import { VendorService } from './food-stall-vendor/vendors.service';
import { FoodStallVendorsComponent } from './admin/foodStallVendors.component';
import { AdminService } from './admin/admin.service';
import { VendorFilterPipe } from './admin/vendor-filter.pipe';
import { EditVendorFormComponent } from './admin/editVendor-form.component';
import { AboutComponent } from './about/about.component';

//Registration....................
import { RegistrationService } from './signupandlogin-forms/registration.service';
import { RegistrationSuccess } from './signupandlogin-forms/registrationsuccess.component';
import { SignUpComponent } from './signupandlogin-forms/signup.component';
import { LoginComponent } from './signupandlogin-forms/login.component';

//sharedservice.................
import { DataService } from "./sharedservice/data.service";

//datatable....
import { DataTableModule } from "angular2-datatable";

// merge --> 29-03
///cutomer.........................
import { RestaurantsComponent } from './customer/view-restaurants.component';
import { CustomerService } from './customer/customer.service';
import { NumberPickerComponent } from './angular2-number-picker/angular2-number-picker.component';
import { RestaurantComponent } from "./customer/view-restaurant.component";

import { PaymentModule } from '../app/payments/payment/payment.module';
import { OrderComponent } from './orders/order/order.component';
import { CurrentorderComponent } from './orders/currentorder/currentorder.component';
import { PreviousordersComponent } from './orders/previousorders/previousorders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { VendorhomeComponent } from './food-stall-vendor/vendorhome/vendorhome.component';
import { ProfileComponent } from './food-stall-vendor/profile/profile.component';
import { ViewprofileComponent } from './food-stall-vendor/viewprofile/viewprofile.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AuthService } from './services/auth.service';
import { MenucardComponent } from './menucard/menucard.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FoodStallVendorsComponent,
    VendorFilterPipe,
    MenuCategoriesComponent,
    MenuCategoryFilterPipe,
    AddMenuItemFormComponent,
    EditMenuItemFormComponent,
    MenuItemsComponent,
    MenuItemFilterPipe,
    AddVendorDetailsComponent,
    EditVendorFormComponent,
    VendorDetailsComponent,
    SignUpComponent,
    LoginComponent,
    RegistrationSuccess,
    RestaurantsComponent,
    RestaurantComponent,
    NumberPickerComponent,
    OrderComponent,
    CurrentorderComponent,
    PreviousordersComponent,
    VendorhomeComponent,
    ProfileComponent,
    ViewprofileComponent,
    MenucardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule, 
    routing, 
    HttpClientModule, 
    NgbModule.forRoot(),
    MultiselectDropdownModule,
    DataTableModule,
    ReactiveFormsModule,
    PaymentModule,
    FileUploadModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [VendorService,
     AdminService, RegistrationService, CustomerService,
    DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
