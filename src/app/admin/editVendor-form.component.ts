import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from './admin.service';
import { FoodStallVendor } from '../food-stall-vendor/foodStallVendor';
import { VendorService } from "../food-stall-vendor/vendors.service";
import * as lodash from 'lodash';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { forEach } from '@angular/router/src/utils/collection';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'editVendor-form',
  templateUrl: './editVendor-form.component.html'
})
export class EditVendorFormComponent implements OnInit {

  constructor(private _adminService: AdminService, private _vendorService: VendorService, private route: ActivatedRoute, private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  // openingtime = { hour: 5, minute: 0 };
  // closingtime = { hour: 23, minute: 0 };

  vendorId: string;
  vendorDetails: FoodStallVendor;
  meridian = true;
  openingtime: any = {};
  closingtime: any = {};

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.vendorId = params['vendorId'];
      this._vendorService.getVendor(this.vendorId).subscribe(
        (vendor: any) => {
          // console.log("Form Value = " + JSON.stringify(vendor, null, 4));
          if (vendor.length != 0) {
            this.vendorDetails = vendor[0];
            console.log("Form Value = " + JSON.stringify(this.vendorDetails, null, 4));
            this.cuisineModel = this.fetchCuisineIds(this.vendorDetails.cuisine);
            this.typeModel = this.fetchTypeIds(this.vendorDetails.type);
            this.workingDayModel = this.fetchWorkingDayIds(this.vendorDetails.workingday);
            this.openingTimeSpiltToJson(this.vendorDetails.openingtime);
            this.closingTimeSpiltToJson(this.vendorDetails.closingtime);
          } else {
            console.log('In else block');
          }
        },
        err => console.log(err)
      );
    });
  }

  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'checkboxes',
    containerClasses: 'dropdown-inline',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 10,
    displayAllSelectedText: true,
    showCheckAll: true,
    showUncheckAll: true,
  };

  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'None Selected',
    allSelected: 'All selected',
  };

  cuisineModel: number[] = [];
  CuisineOptions: IMultiSelectOption[] = [
    { id: 1, name: 'American' },
    { id: 2, name: 'Snacks' },
    { id: 3, name: 'Sandwiches' },
    { id: 4, name: 'Wraps' },
    { id: 5, name: 'Pizza' },
    { id: 6, name: 'Punjabi' },
    { id: 7, name: 'Chinese' },
    { id: 8, name: 'Desserts' },
    { id: 9, name: 'Biryani' },
    { id: 10, name: 'Sea Food' },
    { id: 11, name: 'Bengali' },
    { id: 12, name: 'Mexican' },
    { id: 13, name: 'Salads' },
    { id: 14, name: 'Kebab' },
    { id: 15, name: 'Cakes-Bakery' },
    { id: 16, name: 'Andhra' },
    { id: 17, name: 'South Indian' },
    { id: 18, name: 'Hyderabadi' }
  ];

  // typeModel: number[] = [1];
  typeModel: number[] = [];
  typeOptions: IMultiSelectOption[] = [
    { id: 1, name: 'Non-Veg' },
    { id: 2, name: 'Veg' }
  ];

  workingDayModel: number[] = [];
  workingDayOptions: IMultiSelectOption[] = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 7, name: 'Sunday' }
  ];

  onChange() {
    console.log(this.cuisineModel);
  }

  onSubmit(formValue: any) {
    console.log("Form Value = " + JSON.stringify(formValue, null, 4));
    let updatedVendor = {
      vendorId: this.vendorId,
      vendorName: this.vendorDetails.vendorName,
      menuCategories: this.vendorDetails.menuCategories,
      cuisine: this.fetchCuisineNames(formValue.cuisineModel),
      type: this.fetchTypeNames(formValue.typeModel),
      openingtime: this.timeCalc(formValue.openingtime.hour, formValue.openingtime.minute),
      closingtime: this.timeCalc(formValue.closingtime.hour, formValue.closingtime.minute),
      workingday: this.fetchWorkingDayNames(formValue.workingDayModel),
      gst: formValue.gst,
      profileUrl: this.vendorDetails.profileUrl,
      orders: []
    };
    console.log(updatedVendor);
    this._vendorService.updateVendor(updatedVendor).subscribe(
      (data: any) => {
        console.log('**********vendor updated************');
        this.toastr.success('Restaurant details are updated.', null, { toastLife: 10000 });
        setTimeout(() => {
          this.router.navigate(["/vendorhome", this.vendorId]);
          console.log('hi');
        }, 1000);
      },
      err => console.log(err)
    );
  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  timeCalc(hours, minutes) {
    return this.twoDigitsFormat(hours) + ':' + this.twoDigitsFormat(minutes);//+' '+this.checkAMorPM(hours);
  }

  twoDigitsFormat(n) {
    return n > 9 ? "" + n : "0" + n;
  }

  cuisineNames: string[] = [];
  ids: number[];
  fetchCuisineNames(numbers) {
    // console.log(numbers);
    numbers.forEach(id => {
      // console.log('fetchCuisineNames : '+lodash.find(this.CuisineOptions,{id : id}).name);
      this.cuisineNames.push(lodash.find(this.CuisineOptions, { id: id }).name);
    });
    return this.cuisineNames;
  }

  typeNames: string[] = [];
  fetchTypeNames(numbers) {
    // console.log(numbers);
    numbers.forEach(id => {
      // console.log('fetchCuisineNames : '+lodash.find(this.CuisineOptions,{id : id}).name);
      this.typeNames.push(lodash.find(this.typeOptions, { id: id }).name);
    });
    return this.typeNames;
  }

  workingDayNames: string[] = [];
  fetchWorkingDayNames(numbers) {
    // console.log(numbers);
    numbers.forEach(id => {
      // console.log('fetchCuisineNames : '+lodash.find(this.CuisineOptions,{id : id}).name);
      this.workingDayNames.push(lodash.find(this.workingDayOptions, { id: id }).name);
    });
    return this.workingDayNames;
  }

  cuisineNumbers: number[] = [];
  fetchCuisineIds(names) {
    names.forEach(name => {
      // console.log('fetchCuisineNames : '+lodash.find(this.CuisineOptions,{name : name}));
      this.cuisineNumbers.push(lodash.find(this.CuisineOptions, { name: name }).id);
    });
    console.log('printing cuisine numbers ' + this.cuisineNumbers);
    return this.cuisineNumbers;
  }

  typeNumbers: number[] = [];
  fetchTypeIds(names) {
    names.forEach(name => {
      // console.log('fetchCuisineNames : '+lodash.find(this.CuisineOptions,{id : id}).name);
      this.typeNumbers.push(lodash.find(this.typeOptions, { name: name }).id);
    });
    console.log('printing type numbers ' + this.typeNumbers);
    return this.typeNumbers;
  }

  workingDayNumbers: number[] = [];
  fetchWorkingDayIds(names) {
    names.forEach(name => {
      // console.log('fetchCuisineNames : '+lodash.find(this.CuisineOptions,{id : id}).name);
      this.workingDayNumbers.push(lodash.find(this.workingDayOptions, { name: name }).id);
    });
    console.log('printing working day numbers ' + this.workingDayNumbers);
    return this.workingDayNumbers;
  }

  // "openingtime": "05:00",
  // "closingtime": "23:00"
  timearr: string[] = [];
  openingTimeSpiltToJson(time: string) {
    this.timearr = time.split(":");
    //console.log(this.timearr);
    this.openingtime.hour = parseInt(this.timearr[0]);
    this.openingtime.minute = parseInt(this.timearr[1]);
    console.log(this.openingtime);
  }

  closingTimeSpiltToJson(time: string) {
    this.timearr = time.split(":");
    //console.log(this.timearr);
    this.closingtime.hour = parseInt(this.timearr[0]);
    this.closingtime.minute = parseInt(this.timearr[1]);
    console.log(this.closingtime);
  }

}
