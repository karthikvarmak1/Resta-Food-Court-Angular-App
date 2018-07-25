import { Component } from '@angular/core';
import { VendorService } from "./vendors.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { forEach } from '@angular/router/src/utils/collection';
import * as lodash from 'lodash';
import { DataService } from "../sharedservice/data.service";
import { FileUploader, FileItem } from 'ng2-file-upload';
import { environment } from '../../environments/environment';

const URL = environment.folderURL;
const PROFILE_URL = environment.serverURL;

@Component({
    selector: 'add-vendor',
    templateUrl: './addVendorDetails-form.component.html',
})

export class AddVendorDetailsComponent {

    public uploader:FileUploader = new FileUploader({url: URL});
    fileItem : FileItem ;
    
    // needed this values
    meridian = true;
    openingtime = { hour: 5, minute: 0 };
    closingtime = { hour: 23, minute: 0 };
 
    vendorName: string;
    gst: number;
    partnerId : string = '';

    //Cuisines : string[];
    Types: string[] = ['Veg', 'NonVeg'];
    Workingdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    constructor(private dataService : DataService, private _vendorService : VendorService, private route: ActivatedRoute, private router: Router) { 
        this.uploader.onAfterAddingFile = (fileItem) => {
            console.log('***********************');
            console.log(this.uploader.queue.length);
            if(this.uploader.queue.length>0){
              this.fileItem = this.uploader.queue[this.uploader.queue.length-1];
              this.fileItem.file.name=this.partnerId+'_restaurant'+'.jpg';
            }
            // Wrong way of doing this....!!!
            console.log(this.fileItem);
            console.log('***********************');
          //  this.filePreviewPath  = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
          }
    }

    // cuisineModel: number[] = [3, 5];
    cuisineModel: number[] = [];
    mySettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'checkboxes',
        containerClasses : 'dropdown-inline',
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

    ngOnInit() {
       // this.dataService.currentPartnerId.subscribe(id=> this.partnerId=id);
        this.partnerId = localStorage.getItem('currentUser');
        console.log('Partner Id in Add Vendor(local storage) : '+this.partnerId);
    }

    onChange() {
        console.log(this.cuisineModel);
    }

    onSubmit(formValue: any) {
        // console.log("Form Value = " + JSON.stringify(formValue, null, 4));
        // console.log('Opening Time: '+(formValue.closingtime.minute));
        // console.log('Selected Cuisines: '+(formValue.cuisineModel));
        console.log(this.fileItem);
        this.fileItem.withCredentials=false;
        if(this.fileItem){
          console.log('hii');
          this.uploader.uploadItem(this.fileItem);
        }

        let newVendor = {
            vendorId: this.partnerId,
            vendorName: formValue.vendorName,
            menuCategories: [],
            cuisine: this.fetchCuisineNames(formValue.cuisineModel),
            type: this.fetchTypeNames(formValue.typeModel),
            openingtime: this.timeCalc(formValue.openingtime.hour, formValue.openingtime.minute),
            closingtime: this.timeCalc(formValue.closingtime.hour, formValue.closingtime.minute),
            workingday: this.fetchWorkingDayNames(formValue.workingDayModel),
            gst: formValue.gst,
            profileUrl: PROFILE_URL+this.partnerId+'_restaurant'+'.jpg',
            orders : []
        };
        //console.log("heyyyy[[[[["+this.image);
        
        localStorage.setItem('vendordetails', JSON.stringify(newVendor));
        this._vendorService.saveVendor(newVendor).subscribe(
            (data : any)=> {
                // console.log("Form Value = " + JSON.stringify(data, null, 4));
                this.dataService.addedVendorDetailsInFirstForm(data);
                this.router.navigate(['menu-categories']);
            },
            err => console.log(err)
          );
     //  this._vendorsService.addVendor(newVendor);
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
    // checkAMorPM(hours){
    //    return (hours >= 12) ? "PM" : "AM";
    // }
}
