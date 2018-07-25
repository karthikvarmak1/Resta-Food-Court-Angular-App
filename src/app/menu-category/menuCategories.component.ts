import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import * as lodash from 'lodash';
import { DataService } from "../sharedservice/data.service";
import { VendorService } from "../food-stall-vendor/vendors.service";

@Component({
  selector: 'app-menucategories',
  templateUrl: './menuCategories.component.html',
  styleUrls: ['./menucategories.component.css']
})

export class MenuCategoriesComponent implements OnInit {
  menuCategories: any[];
  menuCategoryIds: string[] = [];
  title: string = 'Menu Categories';
  partnerId: string;
  titleFilter: string = '';
  isCategoriesSelected: boolean = false;
  customCategoryName: string = '';
  isCategoryListed : boolean = false;
  vendorDetails : any = {};
  categoryName :string = '';

  constructor(private _vendorService : VendorService, private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  menuCategoriesModel: number[] = []; // have to remove hardcoded value
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'checkboxes',
    containerClasses: 'dropdown-inline',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 10,
    displayAllSelectedText: true,
    showCheckAll: true,
    showUncheckAll: true
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
  menuCategoriesOptions: IMultiSelectOption[] = [
    { id: 1, name: 'Starters' },
    { id: 2, name: 'Main Course' },
    { id: 3, name: 'Desserts' },
    { id: 4, name: 'Wraps' },
    { id: 5, name: 'Breads' },
    { id: 6, name: 'Soups' },
    { id: 7, name: 'Salads' },
    { id: 8, name: 'Drinks' },
    { id: 9, name: 'Shakes' },
    { id: 10, name: 'Rice Items' },
    { id: 11, name: 'Chinese' },
    { id: 12, name: 'Fresh Cakes' },
    { id: 13, name: 'Biryanis' },
    { id: 14, name: 'Fast Food' },
    { id: 15, name: 'Italian' }
  ];

  ngOnInit() {
    this.partnerId = localStorage.getItem('currentUser');
    console.log('partner Id in menu Categories Component (local storage): ' + this.partnerId);
  }

  // menuCategoriesSelectedOptions: any[]=[];
  //Hardcoded for time - being
  menuCategoriesSelectedOptions: any[] = [];
  // [
  //   {
  //     "id": 1,
  //     "name": "Starters"
  //   },
  //   {
  //     "id": 2,
  //     "name": "Main Course"
  //   },
  //   {
  //     "id": 3,
  //     "name": "Desserts"
  //   }
  // ]

  onChange() {
    this.menuCategoriesSelectedOptions = [];
    // console.log(this.menuCategoriesModel);
    if (this.menuCategoriesModel.length > 0) {
      this.isCategoriesSelected = true;
    }
    this.fetchSelectedCategoriesList(this.menuCategoriesModel);
  }

  fetchSelectedCategoriesList(menuCategoriesModel) {
    menuCategoriesModel.forEach(id => {
      // console.log('fetchCuisineNames : '+lodash.find(this.CuisineOptions,{id : id}).name);
      this.menuCategoriesSelectedOptions.push(lodash.find(this.menuCategoriesOptions, { id: id }));
    });
    //console.log(JSON.stringify(this.menuCategoriesSelectedOptions,null,4));
    return this.menuCategoriesSelectedOptions;
  }

  customCategory: any = {};
  onSubmittingCustomCategory() {
    var count = lodash.maxBy(this.menuCategoriesSelectedOptions,'id').id+1;
    let customCategory = {
      id: count,
      name: this.toTitleCase(this.customCategoryName)
    };
    this.menuCategoriesSelectedOptions.push(customCategory);
  }

  deleteMenuCategory(menuCategoryId: any) {
    lodash.remove(this.menuCategoriesSelectedOptions, { id: parseInt(menuCategoryId) });
  }
  
  onKey(event: any){
    var str = this.toTitleCase(this.customCategoryName);
    if(lodash.find(this.menuCategoriesOptions, { name : str })){
      this.isCategoryListed=true;
    }else{
      if(lodash.find(this.menuCategoriesSelectedOptions, { name : str })){
        this.isCategoryListed=true;
      }else{
        this.isCategoryListed=false;
      }
    }
  }

  selectedMenuCategories(element: HTMLInputElement) {
    // console.log('element Name------>' + element.name);
    // console.log('element value----->' + element.value);
    var position = this.menuCategoryIds.indexOf(element.value);
    // console.log('possition of unticked checkbox : ' + position);
    element.checked ? this.menuCategoryIds.push(element.value) : this.menuCategoryIds.splice(position, 1);
    // console.log('Selected Book ids: ' + this.menuCategoryIds);
  }

  deleteMultipleMenuCategories() {
    let menuCategoriesToDelete = this.menuCategoryIds;
    //console.log(menuCategoriesToDelete);
    for(let k = 0; k < menuCategoriesToDelete.length; k++){
      lodash.remove(this.menuCategoriesSelectedOptions, { id: parseInt(menuCategoriesToDelete[k]) });
    }
   // console.log(this.menuCategoriesSelectedOptions);
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  sendCategoryName(name : string){
   // console.log('hey name : '+name);
    this.categoryName = name;
    this.dataService.sendcurrentMenuCategory(name);
  }

}

