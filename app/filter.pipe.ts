import {PipeTransform, Pipe} from "@angular/core";
@Pipe({
    name: 'filter'
})
/**
 * Filtro che ordina e filtra per inserimento
 */
export class FilterPipe implements PipeTransform {

    transform(array: any, daFiltrare: any): any {
        if (array === undefined) return array;

        /**
         * Ordinamento
         */
        array.sort((a: any, b: any) => {
            if (a.string_name().toLowerCase() < b.string_name().toLowerCase()) {
                return -1;
            } else if (a.string_name().toLowerCase() > b.string_name().toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        });

        if (daFiltrare === undefined) return array;
        if (array.length == 0) return array

        if (daFiltrare === undefined) return array;

        return array.filter(function (user: any) {
            return user.string_name().toLowerCase().includes(daFiltrare.toLowerCase());

        })

    }
}