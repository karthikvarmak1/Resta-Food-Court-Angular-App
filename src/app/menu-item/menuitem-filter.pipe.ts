import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'menuItemFilter'})
export class MenuItemFilterPipe implements PipeTransform {
    transform(value: any[], args: string): any[] {
        let filter: string = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter((menuItem) =>
        menuItem.itemName.toLocaleLowerCase().startsWith(filter) != false) : value;
    }
}