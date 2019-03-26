import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ElectronService} from './providers/electron.service';
import {IpcListenerService} from './providers/ipc/ipc-listener.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // IPCListener has to be instantiated here
    constructor(public electronService: ElectronService,
                private translate: TranslateService,
                private ipcListener: IpcListenerService) {

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
