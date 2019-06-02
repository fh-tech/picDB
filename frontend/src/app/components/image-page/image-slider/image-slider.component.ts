import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Picture} from '../../../interfaces/picture';
import {SlideEvent} from '../../../interfaces/slideEvent';

@Component({
    selector: 'app-image-slider',
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

    @ViewChild('slickCarouselComponent') slick;

    @Output() afterScroll = new EventEmitter<SlideEvent>();
    @Output() chooseImage = new EventEmitter<Picture>();

    @Input() images: Picture[];
    @Input() slidesToShow: number;
    @Input() slidesToScroll: number;
    @Input() initialSlide: number;
    @Input() infinite: boolean;
    @Input() arrows: boolean;
    @Input() activePicture: Picture;

    slideConfig: any;

    ngOnInit(): void {
        this.slideConfig = {
            'slidesToShow': this.slidesToShow,
            'slidesToScroll': this.slidesToScroll,
            'infinite': this.infinite,
            'arrows': this.arrows,
            'initialSlide': this.initialSlide,
        };
    }


    constructor() {
    }

    afterChange(e) {
        this.afterScroll.emit({currentSlide: e.currentSlide});
    }

    identify(index, item: Picture) {
        return item.pictureId;
    }

    onClickImage(pic: Picture) {
        this.chooseImage.emit(pic);
    }

    slideToSlide(index: number) {
        this.slick.slickGoTo(index);
    }

}
