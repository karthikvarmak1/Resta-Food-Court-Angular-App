import { MenuCategory }  from '../menu-category/menu-category';

export class FoodStallVendor {
    vendorId: string;
    vendorName: string;
    menuCategories: MenuCategory[];
    cuisine: string[];
    type: string[];
    openingtime: string;
    closingtime: string;
    workingday: string[];
    gst: number;
    profileUrl: string;
    orders:any[];
}