import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadState, SignalRService} from '../../../providers/signal-r/signal-r.service';

@Component({
  selector: 'app-progress-bar-modal',
  templateUrl: './progress-bar-modal.component.html',
  styleUrls: ['./progress-bar-modal.component.scss']
})
export class ProgressBarModalComponent implements OnDestroy {

  private sub;
  private innerSub;
  private loadPercentage: number|string = 0.0;
  private loadEvents$ = this.signalr.loaderEventStream$;

  constructor(private signalr: SignalRService) {
    this.sub = this.loadEvents$
        .subscribe({
          next: e =>
              this.innerSub = e.subscribe(
                  (p)=>
                      this.loadPercentage = p),
          complete: () => this.innerSub.unsubscribe()
        });
  }

  ngOnDestroy(): void {
    if(this.innerSub) this.innerSub.unsubscribe();
  }

  get loadPerc(): number {
    if(typeof this.loadPercentage == 'number') {
      return this.loadPercentage
    } else {
      return 1;
    }
  }

}
