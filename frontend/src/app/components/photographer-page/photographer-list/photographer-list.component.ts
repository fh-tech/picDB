import { Component } from '@angular/core';
import {Photographer} from '../../../interfaces/photographer';
import {Observable} from 'rxjs';
import {PhotographersService} from '../../../providers/photographers/photographers.service';
import {MatDialog} from '@angular/material';
import {PhotographerUpdateDialogComponent} from '../../modals/photographer-update-dialog/photographer-update-dialog.component';


@Component({
  selector: 'app-photographer-list',
  templateUrl: './photographer-list.component.html',
  styleUrls: ['./photographer-list.component.scss']
})
export class PhotographerListComponent {

    photographers$: Observable<Photographer[]>;

    constructor(private photographersService: PhotographersService,
                public dialog: MatDialog) {
        this.photographers$ = photographersService.photographers$;
    }

    onDelete(photographer: Photographer) {
        this.photographersService.delete(photographer).subscribe();
    }
    
    onUpdate(photographer: Photographer) {
        const dialogRef = this.dialog.open(PhotographerUpdateDialogComponent, {
            width: '400px',
            data: photographer
        });
    }

}
