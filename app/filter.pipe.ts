import {PipeTransform, Pipe} from "@angular/core";
@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {

    transform(users: any, daFiltrare: any): any {

        if (daFiltrare === undefined) return users;

        return users.filter(function (user: any) {
            return user.nome_user.toLowerCase().includes(daFiltrare.toLowerCase());

        })
    }
}