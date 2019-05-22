import {Injectable} from '@angular/core';
import {SignalRService} from '../signal-r/signal-r.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Picture} from '../../interfaces/picture';

@Injectable()
export class ImageService {
    
    pictures$: Observable<Picture[]>;

    constructor(private signalR: SignalRService) {
        this.pictures$ = this.signalR.imageQuery$;
    }
    
    public loadRange(start: number, end: number) {
        this.signalR.query({start: start, end: end, queryString: "", type: 'Full'});
    }


}
