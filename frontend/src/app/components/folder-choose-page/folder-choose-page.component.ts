import { Component } from '@angular/core';
import {FolderService} from '../../providers/folder.service';


@Component({
  selector: 'app-folder-choose-page',
  templateUrl: './folder-choose-page.component.html',
  styleUrls: ['./folder-choose-page.component.css']
})
export class FolderChoosePageComponent {


  constructor(private folderService: FolderService) {}


  onChooseFolder() {
    this.folderService.setFolderPath().then(

    );
  }
}
