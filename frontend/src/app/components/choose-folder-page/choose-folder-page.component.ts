import { Component } from '@angular/core';
import {IpcSenderService} from '../../providers/ipc/ipc-sender.service';

@Component({
  selector: 'app-choose-folder-page',
  templateUrl: './choose-folder-page.component.html',
  styleUrls: ['./choose-folder-page.component.scss']
})
export class ChooseFolderPageComponent {

  constructor(private ipcSender: IpcSenderService) { }


    onChooseFolder() {
        this.ipcSender.sendMessage('getFolderPath');
    }
}
