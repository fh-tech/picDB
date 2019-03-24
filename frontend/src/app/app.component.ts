import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FolderService} from './providers/folder/folder.service';
import {ElectronService} from './providers/electron.service';
import {NavigatorService} from './providers/navigator/navigator.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(public electronService: ElectronService,
                private folderService: FolderService,
                private translate: TranslateService,
                private navigator: NavigatorService) {

        translate.setDefaultLang('en');
        // console.log('AppConfig', AppConfig);

        if (electronService.isElectron()) {

            electronService.ipcRenderer.on('photographer', (event, message) => {
                this.navigator.navigate(['photographer']);
            });
            // console.log('Mode electron');
            // console.log('Electron ipcRenderer', electronService.ipcRenderer);
            // console.log('NodeJS childProcess', electronService.childProcess);
        } else {
            // console.log('Mode web');
        }
    }
}
