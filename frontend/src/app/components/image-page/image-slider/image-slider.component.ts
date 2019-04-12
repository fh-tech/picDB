import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../../providers/image/image.service';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

  
  
  constructor(private imageService: ImageService) { 
    setTimeout(() => {
      this.imageService.loadRange(0,5);
    }, 4000);
  }

  ngOnInit() {
  }

}
