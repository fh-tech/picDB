import {Component, Input} from '@angular/core';
import {PhotographersService} from '../../../providers/photographers/photographers.service';
import {Observable} from 'rxjs';
import {Photographer} from '../../../interfaces/photographer';
import {Picture} from '../../../interfaces/picture';

@Component({
    selector: 'app-image-details',
    templateUrl: './image-details.component.html',
    styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent {

    private photographers$: Observable<Photographer[]>;
    @Input() activeImage: Picture;

    constructor(private photographers: PhotographersService) {
        this.photographers$ = photographers.photographers$;
    }
    
    

}
