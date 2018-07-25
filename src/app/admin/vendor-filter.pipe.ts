import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'vendorFilter'})
export class VendorFilterPipe implements PipeTransform {
    transform(value: any[], args: string): any[] {
        let filter: string = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter((vendor) =>
        vendor.vendorName.toLocaleLowerCase().startsWith(filter) != false) : value;
    }
}