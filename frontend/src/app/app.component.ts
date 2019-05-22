import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ElectronService} from './providers/electron.service';
import {IpcListenerService} from './providers/ipc/ipc-listener.service';
import {LoadState, SignalRService} from './providers/signal-r/signal-r.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ProgressBarModalComponent} from './components/modals/progress-bar-modal/progress-bar-modal.component';
import {NavigatorService} from './providers/navigator/navigator.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    
    private loadState$: Observable<LoadState>;
    
    // IPCListener has to be instantiated here
    constructor(public electronService: ElectronService,
                private translate: TranslateService,
                private ipcListener: IpcListenerService,
                private signalR: SignalRService,
                public dialog: MatDialog,
                private nav: NavigatorService) {

        translate.setDefaultLang('en');
        
        this.signalR.connect().then(_ => {
            this.loadState$ = this.signalR.loadState$;

            this.loadState$.subscribe(state => {
                if(state == 'loading') {
                    this.showProgressBar();
                } else {
                    this.dialog.closeAll();
                    console.log("should navigate");
                    this.nav.navigate(['images']);
                    console.log("navigating done");
                }
            });
        });
    }
    
    showProgressBar(): void {
        const dialogRef = this.dialog.open(ProgressBarModalComponent, {
            width: '800px',
            disableClose: true
        });
    }
}
