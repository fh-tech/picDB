import {Injectable} from '@angular/core';
import {SignalRService} from '../signal-r/signal-r.service';
import {Observable} from 'rxjs';
import {Picture} from '../../interfaces/picture';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ImageService {
    
    public pictures$: Observable<Picture[]>;

    public imageShort$: Observable<string[]>;
    

    constructor(private signalR: SignalRService,
                private http: HttpClient) {
        this.pictures$ = this.signalR.imageQuery$;
        this.imageShort$ = this.signalR.imageShort$;
    }
    
    public loadRange(start: number, end: number) {
        this.signalR.query({start: start, end: end, queryString: "", type: 'Full'});
    }
    
    public loadSingle(name: string) {
        this.signalR.query({start: 0, end: -1, queryString: name, type: 'Full'});
    }
    
    public loadAutoComplete(queryString: string) {
        this.signalR.query({start: 0, end: -1, queryString: queryString, type: 'PathsOnly'});
    }

    public getPictureIndex(id: number): Observable<number> {
        return this.http.get<number>(`http://localhost:5000/api/pictures/${id}`);
    }
    
    public getPictureByName(name: string): Observable<Picture> {
        return this.http.get<Picture>(`http://localhost:5000/api/pictures?fileName=${name}`)
    }
    

}
