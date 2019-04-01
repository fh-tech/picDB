import {Injectable} from '@angular/core';
import {NewPhotographer, Photographer} from '../../interfaces/photographer';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {repeatWhen, tap} from "rxjs/operators";

@Injectable()
export class PhotographersService {

    private refreshSubject = new Subject<any>();

    //TODO: aspnet/signalR HttpClient or angular commons?
    constructor(private http: HttpClient) {}

    public get photographers$(): Observable<Photographer[]> {
        return this.http.get<Photographer[]>('https://localhost:5001/api/photographer')
            .pipe(
                repeatWhen(_ => this.refreshSubject.asObservable())
            )
    }

    add(newPhotographer: NewPhotographer) {
        return this.http.post('http://127.0.0.1:5001/api/photographer', {
            firstName: newPhotographer.firstName,
            lastName: newPhotographer.lastName
        }).pipe(
            tap(ph => this.refreshSubject.next(ph))
        )

    }

    delete(photographer: Photographer) {
        return this.http.delete(`http://127.0.0.1:5001/api/photographer${photographer.id}`)
            .pipe(
                tap(ph => this.refreshSubject.next(ph))
            )
    }

    update(photographer: Photographer) {
        return this.http.put('http://127.0.0.1:5001/api/photographer', {
            id: photographer.id,
            firstName: photographer.firstName,
            lastName: photographer.lastName
        }).pipe(
            tap(ph => this.refreshSubject.next(ph))
        )
    }
    
    getPhotographer(id: number): Observable<Photographer> {
        return this.http.get<Photographer>(`http://127.0.0.1:5001/api/photographer${id}`);
    }
}



