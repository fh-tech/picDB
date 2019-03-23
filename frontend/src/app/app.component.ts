import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FolderService} from './providers/folder.service';
import {ElectronService} from './providers/electron.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(public electronService: ElectronService,
                private folderService: FolderService,
                private translate: TranslateService) {

        translate.setDefaultLang('en');
        // console.log('AppConfig', AppConfig);

        if (electronService.isElectron()) {
            // console.log('Mode electron');
            // console.log('Electron ipcRenderer', electronService.ipcRenderer);
            // console.log('NodeJS childProcess', electronService.childProcess);
        } else {
            // console.log('Mode web');
        }
    }
}
