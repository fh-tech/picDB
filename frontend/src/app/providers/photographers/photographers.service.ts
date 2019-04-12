import {Injectable} from '@angular/core';
import {NewPhotographer, Photographer} from '../../interfaces/photographer';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class PhotographersService {

    private photographers: Photographer[] = [];
    private photographersSubject = new BehaviorSubject(this.photographers);
    photographers$: Observable<Photographer[]> = this.photographersSubject.asObservable();

    constructor() {
        this.photographers = this.load();
        this.publish();
    }

    load(): Photographer[] {
        return [
            {id: 1, firstName: 'John', lastName: 'Smith'},
            {id: 2, firstName: 'Barbara', lastName: 'Wood'}
        ];
    }

    reload() {
        this.photographers = this.load();
        this.publish();
    }

    add(newPhotographer: NewPhotographer) {
        // TODO: make call to backend and reload photographer collection
        this.photographers = [{
            id: 3,
            firstName: newPhotographer.firstName,
            lastName: newPhotographer.lastName
        }, ...this.photographers];

        this.publish();
    }

    delete(photographer: Photographer) {
        // TODO: make call to backend and just reload
        this.photographers = this.photographers.filter(pho => pho.id !== photographer.id);
        this.publish();
    }

    update(photographer: Photographer) {
        // TODO: update backend and reload
        let ph = this.photographers.find(pho => pho.id === photographer.id);
        ph.lastName = photographer.lastName;
        ph.firstName = photographer.firstName;
        this.publish();
    }

    private publish() {
        this.photographersSubject.next(this.photographers);
    }


}
