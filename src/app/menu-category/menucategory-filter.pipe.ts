import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'menuCategoryFilter'})
export class MenuCategoryFilterPipe implements PipeTransform {
    transform(value: any[], args: string): any[] {
        let filter: string = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter((menuCategory) =>
        menuCategory.name.toLocaleLowerCase().startsWith(filter) != false) : value;
    }
}