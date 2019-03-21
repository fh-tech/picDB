import { Component } from '@angular/core';
import {FileService} from './services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-electron';

  constructor(private fileService: FileService) {
    fileService.getFiles();
  }
}
