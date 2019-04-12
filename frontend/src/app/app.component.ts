import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ElectronService} from './providers/electron.service';
import {IpcListenerService} from './providers/ipc/ipc-listener.service';
import {SignalRService} from './providers/signal-r/signal-r.service';
import {ImageService} from './providers/image/image.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // IPCListener has to be instantiated here
    constructor(public electronService: ElectronService,
                private translate: TranslateService,
                private ipcListener: IpcListenerService,
                private signalR: SignalRService,
                private imageService: ImageService) {

        translate.setDefaultLang('en');
        // console.log('AppConfig', AppConfig);

        if (electronService.isElectron()) {
            this.signalR.connect().then(res => {
                console.log('loading range');
                this.imageService.loadRange(0, 5);
            });
            // console.log('Mode electron');
            // console.log('Electron ipcRenderer', electronService.ipcRenderer);
            // console.log('NodeJS childProcess', electronService.childProcess);
        } else {
            // console.log('Mode web');
        }
    }
}
