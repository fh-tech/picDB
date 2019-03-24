import { Component } from '@angular/core';
import {Photographer} from '../../../interfaces/photographer';
import {Observable} from 'rxjs';
import {PhotographersService} from '../../../providers/photographers/photographers.service';

@Component({
  selector: 'app-photographer-list',
  templateUrl: './photographer-list.component.html',
  styleUrls: ['./photographer-list.component.scss']
})
export class PhotographerListComponent {

    private photographers$: Observable<Photographer[]>;

    constructor(private photographersService: PhotographersService) {
        this.photographers$ = photographersService.photographers$;
    }

    onDelete(photographer: Photographer) {
        this.photographersService.delete(photographer);
    }


}
