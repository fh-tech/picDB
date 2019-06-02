import {Component, ViewChild} from '@angular/core';
import {Picture} from '../../interfaces/picture';
import {ImageService} from '../../providers/image/image.service';
import {SlideEvent} from '../../interfaces/slideEvent';


@Component({
    selector: 'app-image-page',
    templateUrl: './image-page.component.html',
    styleUrls: ['./image-page.component.css']
})
export class ImagePageComponent {


    @ViewChild('sliderComponent') slider;

    activePicture: Picture = {
        pictureId: -1,
        name: 'placeholder',
        filePath: 'assets/img/placeholder.png',
        photographer: null,
        metaData: null
    };

    pictures: Picture[] = [];

    slidesToShow = 4;
    slidesToScroll = 4;
    initialSlide = 0;
    infinite = false;
    arrows = true;

    startIndex = 0;
    endIndex = 20;


    options: string[] = [];

    scrollToImageID: number = -1;

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
            if(this.scrollToImageID > -1) {
                console.log(this.scrollToImageID);
                let index = this.pictures.findIndex(p => p.pictureId === this.scrollToImageID);
                console.log(index);
                this.slider.slideToSlide(index + 1);
                console.log(this.pictures);
                this.scrollToImageID = -1;
            }
        });
        this.imageService.imageShort$.subscribe(options => this.options = options);
    }

    handleSlideEvent(slideEvent: SlideEvent) {
        if ((slideEvent.currentSlide + this.slidesToScroll * 2) == this.endIndex) {
            this.reloadToIndex();
        }
    }

    handleChooseImageEvent($event: Picture) {
        this.activePicture = $event;
    }

    // from the search bar when a searched for option is chosen
    onChooseOption(name: string) {
        this.options = [];
        console.log('chosen option:' + name);

        let index = this.pictures.findIndex(p => p.name === name);
        if (index > -1) {
            this.slider.slideToSlide(index);
            this.activePicture = this.pictures[index];
        } else {
            this.imageService.getPictureByName(name).subscribe(p => {
                console.log(p);
                this.imageService.getPictureIndex(p.pictureId).subscribe(index => {
                    this.activePicture = p;
                    // TODO: think about that ( setting scrollToImageID and (line 51 when the observable emits the new images and scrollTo was set it will scroll to the index... 
                    this.scrollToImageID = p.pictureId;
                    this.reloadToIndex(index);
                });
            });
        }
    }

    onStartSearch(searchString: string) {
        this.imageService.loadAutoComplete(searchString);
    }

    reloadToIndex(index: number = this.endIndex) {
        let reloadStart = this.endIndex;
        this.endIndex += index + this.slidesToScroll * 4;
        this.imageService.loadRange(reloadStart, this.endIndex);
    }
}
