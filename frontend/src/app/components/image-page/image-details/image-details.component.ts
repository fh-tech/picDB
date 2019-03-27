import {Component, OnInit} from '@angular/core';
import {PhotographersService} from '../../../providers/photographers/photographers.service';
import {Observable} from 'rxjs';
import {Photographer} from '../../../interfaces/photographer';

@Component({
    selector: 'app-image-details',
    templateUrl: './image-details.component.html',
    styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent {

    private photographers$: Observable<Photographer[]>;

    constructor(private photographers: PhotographersService) {
        this.photographers$ = photographers.photographers$;
    }

}
