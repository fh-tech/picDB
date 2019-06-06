import {Component, ViewChild} from '@angular/core';
import {Picture} from '../../interfaces/picture';
import {ImageService} from '../../providers/image/image.service';
import {SlideEvent} from '../../interfaces/slideEvent';
import {Observable} from 'rxjs';


@Component({
    selector: 'app-image-page',
    templateUrl: './image-page.component.html',
    styleUrls: ['./image-page.component.css']
})
export class ImagePageComponent {


    @ViewChild('sliderComponent') slider;

    activePicture: Picture;

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
    scrollToImageName: string = '';


    constructor(private imageService: ImageService) {
        this.reset();
        
        this.imageService.refreshFolder$.subscribe(b => {
            if (b) {
                this.reset();
            }
        });

        this.imageService.imageShort$.subscribe(options => this.options = options);

        // initial load of images
        // this.imageService.loadRange(this.startIndex, this.endIndex);
        this.imageService.pictures$.subscribe(pics => {
            this.pictures.push(...pics);
            if (this.activePicture.pictureId == -1) {
                if (pics[0]) {
                    this.activePicture = pics[0];
                }
            }
            
            if (this.scrollToImageID > -1) {
                let index = this.pictures.findIndex(p => p.pictureId === this.scrollToImageID);
                // sanity check
                if (index <= 0) {
                    this.imageService.getPictureByName(this.scrollToImageName).subscribe(p => {
                        this.pictures.push(p);
                        let index = this.pictures.findIndex(pic => pic.pictureId === p.pictureId);
                        this.slider.slideToSlide(index);
                    });
                } else {
                    setTimeout(_ => this.slider.slideToSlide(index), 600);
                    // this.slider.slideToSlide(index);
                }
                this.scrollToImageID = -1;
                this.scrollToImageName = '';
            }
        });
    }


    reset() {
        this.pictures = [];

        this.activePicture = {
            pictureId: -1,
            name: 'placeholder',
            filePath: 'assets/img/placeholder.png',
            photographer: null,
            metaData: null,
            tags: []
        };

        this.startIndex = 0;
        this.endIndex = 20;

        this.imageService.loadRange(0, 20);
    }

    handleSlideEvent(slideEvent: SlideEvent) {
        if ((slideEvent.currentSlide + this.slidesToScroll * 2) >= this.endIndex) {
            this.reloadToIndex();
        }
    }

    handleChooseImageEvent($event: Picture) {
        this.activePicture = $event;
    }

    // from the search bar when a searched for option is chosen
    onChooseOption(name: string) {
        this.options = [];

        let index = this.pictures.findIndex(p => p.name === name);
        if (index > -1) {
            this.slider.slideToSlide(index);
            this.activePicture = this.pictures[index];
        } else {
            this.imageService.getPictureByName(name).subscribe(p => {
                this.imageService.getPictureIndex(p.pictureId).subscribe(index => {
                    this.activePicture = p;
                    this.scrollToImageID = p.pictureId;
                    this.scrollToImageName = p.name;
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
