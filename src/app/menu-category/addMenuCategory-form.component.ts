// import { Component } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';

// import { MenuCategoryService } from './menu-category.service';
// import { MenuCategoryComponent } from './menu-category.component';
// import { MenuCategoriesComponent } from './menuCategories.component';
// import { DataService } from "../sharedservice/data.service";

// @Component({
//   selector: 'addMenuCategory-form',
//   templateUrl: './addMenuCategory-form.component.html'
// })
// export class AddMenuCategoryFormComponent {
//   partnerId: string;
//   allMenuCategories: MenuCategoryComponent[] = [
//     new MenuCategoryComponent('1', 'Starter', []),
//     new MenuCategoryComponent('2', 'Main Course', []),
//     new MenuCategoryComponent('3', 'Dessert', []),
//     new MenuCategoryComponent('4', 'Wraps', []),
//     new MenuCategoryComponent('5', 'Breads', []),
//     new MenuCategoryComponent('6', 'Soups', []),
//     new MenuCategoryComponent('7', 'Salads', []),
//     new MenuCategoryComponent('8', 'Drinks', []),
//     new MenuCategoryComponent('9', 'Shakes', []),
//     new MenuCategoryComponent('10', 'Rice Items', []),
//     new MenuCategoryComponent('11', 'Biryani', []),
//     new MenuCategoryComponent('12', 'Chinese', []),
//     new MenuCategoryComponent('13', 'Cakes Bakery', []),
//     new MenuCategoryComponent('14', 'Fast Food', []),
//     new MenuCategoryComponent('15', 'Italian', [])
//   ]

//   constructor(private _menuCategoryService: MenuCategoryService, private dataService : DataService, private router: Router, private route: ActivatedRoute) { }

//   ngOnInit(){
//     this.dataService.currentPartnerId.subscribe(id=> this.partnerId=id);
//     console.log('Partner Id in Add Menu Category : '+this.partnerId);
//   }

//   onSubmit(formValue: any) {
//     console.log("Form Value = " + JSON.stringify(formValue, null, 4));
//     /*for multiselect*/
//     this.route.params.forEach((params: Params) => {
//       console.log(params);
//       this.partnerId = params['vendorId'];
//       console.log("id is :" + this.partnerId + "---" + params['vendorId']);
//     });

//     let foodStallVendors = JSON.parse(localStorage.getItem('foodStallVendors'));
//   //  let menuCategoryCount = this._menuCategoryService.getMenuCategoryCount();
//     let selectedMenuCategories: MenuCategoryComponent[] = formValue.selectedMenuCategories;
//     console.log(selectedMenuCategories);
//    // console.log("--->" + selectedMenuCategories + "---" + menuCategoryCount);
//     for (let i = 0; i < selectedMenuCategories.length; i++) {
//       let rand = Math.floor((Math.random() * 100) + 1);
//       let catId = selectedMenuCategories[i].toString().toUpperCase().substr(0, 2) + rand;
//       let menuCategory = {
//         id: catId,
//         menuCategoryName: selectedMenuCategories[i],
//         menuItems: []
//       };
//       //menuCategoryCount += 1;
//       this._menuCategoryService.addMenuCategory(menuCategory);

//     //  console.log("count--" + menuCategoryCount);
//       console.log("cat----" + menuCategory.id + "----->" + menuCategory.menuCategoryName);
//       for (let j = 0; j < foodStallVendors.length; j++) {
//         console.log(foodStallVendors[j].vendorId + "----" + this.partnerId);
//         if (foodStallVendors[j].vendorId == this.partnerId) {
//           foodStallVendors[j].menuCategoryIds.push(catId);
//           console.log("-----");
//           console.log(foodStallVendors[j].menuCategoryIds);
//           localStorage.setItem('foodStallVendors', JSON.stringify(foodStallVendors));
//         }
//       }
//     }

//     this.router.navigate(['menuCategories', this.partnerId]);

//   }

// }