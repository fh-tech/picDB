import {Pipe, PipeTransform} from '@angular/core';
import {Photographer} from '../interfaces/photographer';

@Pipe({
    name: 'nameDisplay'
})
export class NameDisplayPipe implements PipeTransform {

    transform(value: Photographer, args?: any): string {
        return value.firstName + ' ' + value.lastName;
    }

}
