import {Component, OnInit} from '@angular/core';
import {PhotographersService} from '../../../providers/photographers/photographers.service';
import {Observable} from 'rxjs';
import {Photographer} from '../../../interfaces/photographer';
import {ImageService} from '../../../providers/image/image.service';
import {Picture} from '../../../interfaces/picture';

@Component({
    selector: 'app-image-details',
    templateUrl: './image-details.component.html',
    styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent {

    private photographers$: Observable<Photographer[]>;
    
    private activePicture: Picture;

    constructor(private photographers: PhotographersService,
                private imageService: ImageService ) {
        this.photographers$ = photographers.photographers$;
    }

}
