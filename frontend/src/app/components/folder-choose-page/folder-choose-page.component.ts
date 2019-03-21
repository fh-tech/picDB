import { Component, OnInit } from '@angular/core';

import { remote } from 'electron';

@Component({
  selector: 'app-folder-choose-page',
  templateUrl: './folder-choose-page.component.html',
  styleUrls: ['./folder-choose-page.component.css']
})
export class FolderChoosePageComponent implements OnInit {

  mainProcess = remote.require('./main');

  constructor() {
    document.getElementById('test').addEventListener('click', _ => {
      this.mainProcess.selectDirectory();
    });
  }

  ngOnInit() {
  }

}
