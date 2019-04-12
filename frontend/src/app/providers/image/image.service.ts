import {Injectable} from '@angular/core';
import {SignalRService} from '../signal-r/signal-r.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Picture} from '../../interfaces/picture';

@Injectable()
export class ImageService {
    
    pictures: Picture[] = [];
    private picturesSubject = new BehaviorSubject<Picture[]>(this.pictures);
    pictures$: Observable<Picture[]> = this.picturesSubject.asObservable();

    constructor(private signalR: SignalRService) {}
    
    public loadRange(start: number, end: number) {
        this.signalR.query({start: start, end: end, queryString: ""}).then(res => console.log(res));
    }


}
