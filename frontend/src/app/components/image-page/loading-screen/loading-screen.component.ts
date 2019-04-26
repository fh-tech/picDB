import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadState, SignalRService} from '../../../providers/signal-r/signal-r.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
    
    private sub;
    private innerSub;
  
    private loadState$: Observable<LoadState>;
    loadPercentage: number|string = 0.0;
    
    private loadEvents$ = this.signalr.loaderEventStream$;
    
    constructor(private signalr: SignalRService) {
        this.loadState$ = this.signalr.loadState$;
        this.sub = this.loadEvents$
            .subscribe({
                next: e => 
                    this.innerSub = e.subscribe(
                    (p)=> 
                            this.loadPercentage = p),
                complete: () => this.sub.unsubscribe()
            });
    }
  
    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.innerSub.unsubscribe();
    }

}
