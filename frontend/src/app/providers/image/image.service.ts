import {Injectable} from '@angular/core';
import {SignalRService} from '../signal-r/signal-r.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Picture} from '../../interfaces/picture';

@Injectable()
export class ImageService {
    
    pictures$: Observable<Picture[]>;
    
    private activeImageSubject: BehaviorSubject<Picture>;
    public activeImage$: Observable<Picture>;

    constructor(private signalR: SignalRService) {
        this.pictures$ = this.signalR.imageQuery$;
        this.pictures$.subscribe(pics => {
            this.activeImageSubject = new BehaviorSubject<Picture>(pics[0]);
            this.activeImage$ = this.activeImageSubject.asObservable();
        })
    }
    
    public loadRange(start: number, end: number) {
        this.signalR.query({start: start, end: end, queryString: "", type: 'Full'});
    }
    
    public changeActiveImage(pic: Picture) {
        this.activeImageSubject.next(pic);
    }


}
