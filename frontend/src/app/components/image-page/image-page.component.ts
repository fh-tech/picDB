import {Component} from '@angular/core';
import {Picture} from '../../interfaces/picture';
import {ImageService} from '../../providers/image/image.service';
import {SlideEvent} from '../../interfaces/slideEvent';

@Component({
    selector: 'app-image-page',
    templateUrl: './image-page.component.html',
    styleUrls: ['./image-page.component.css']
})
export class ImagePageComponent {

    activePicture: Picture = {
        pictureId: -1,
        name: 'placeholder',
        filePath: 'assets/img/placeholder.png',
        photographer: null,
        metadata: null
    };

    pictures: Picture[] = [];

    slidesToShow = 4;
    slidesToScroll = 4;
    initialSlide = 0;
    infinite = false;
    arrows = true;

    startIndex = 0;
    endIndex = 20;


    constructor(private imageService: ImageService) {
        // initial load of images
        this.imageService.loadRange(this.startIndex, this.endIndex);
        this.imageService.pictures$.subscribe(pics => {
            this.pictures.push(...pics);
            if (this.activePicture.pictureId == -1) {
                if (pics[0]) {
                    this.activePicture = pics[0];
                }
            }
        });
    }

    handleSlideEvent(slideEvent: SlideEvent) {
        if ((slideEvent.currentSlide + this.slidesToScroll * 2) == this.endIndex) {
            console.log('forward');
            let reloadStart = this.endIndex;
            this.endIndex += this.slidesToScroll * 4;
            console.log(reloadStart + "-" + this.endIndex);
            this.imageService.loadRange(reloadStart, this.endIndex);
        }
    }

    handleChooseImageEvent($event: Picture) {
        this.activePicture = $event;
    }

}
