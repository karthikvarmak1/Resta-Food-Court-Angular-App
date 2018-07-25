import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MenuItem } from '../menu-item/menuItem';

import * as io from 'socket.io-client';

@Injectable()
export class DataService {
    private messageSource = new BehaviorSubject<string>("Empty Partner Id");
    private vendorDataSource = new BehaviorSubject<any>({});
    private menuCategorySource = new BehaviorSubject<string>("Empty Category Name");
    private menuItemSource = new BehaviorSubject<MenuItem>(new MenuItem());
    private menuCategoriesSource = new BehaviorSubject<any>({});
    private componentNameSource = new BehaviorSubject<string>("Empty Component");

    currentPartnerId = this.messageSource.asObservable();
    vendorData = this.vendorDataSource.asObservable();
    currentMenuCategory = this.menuCategorySource.asObservable();
    currentMenuItem = this.menuItemSource.asObservable();
    CurrentMenuCategories = this.menuCategoriesSource.asObservable();
    currentComponent = this.componentNameSource.asObservable();

    constructor() { }

    loggedInPartnerId(id: string) {
        this.messageSource.next(id);
    }

    addedVendorDetailsInFirstForm(data: any) {
        this.vendorDataSource.next(data);
    }

    sendcurrentMenuCategory(name : string){
        this.menuCategorySource.next(name);
    }

    sendCurrentMenuItem(item : MenuItem){
        this.menuItemSource.next(item);
    }

    sendMenuCategories(data : any){
        this.menuCategoriesSource.next(data);
    }

    sendCurrentComponent(name : string){
        this.componentNameSource.next(name);
    }
    
}
