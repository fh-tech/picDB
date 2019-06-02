import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Photographer} from '../../../interfaces/photographer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PhotographersService} from '../../../providers/photographers/photographers.service';
import {validateBirthDay} from '../../../validators/birthday.validator';


@Component({
    selector: 'app-photographer-update-dialog',
    templateUrl: './photographer-update-dialog.component.html',
    styleUrls: ['./photographer-update-dialog.component.scss']
})
export class PhotographerUpdateDialogComponent {

    photographerUpdateForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<PhotographerUpdateDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Photographer,
                private photographersService: PhotographersService,
                private fb: FormBuilder) {
        this.photographerUpdateForm = fb.group({
            firstName: [this.data.firstName, [Validators.maxLength(100)]],
            lastName: [this.data.lastName, [Validators.required, Validators.maxLength(50)]],
            birthday: [this.data.birthday, [validateBirthDay]],
            notes: [this.data.notes]
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    submit() {
        const value = this.photographerUpdateForm.value;
        let date = value.birthday;
        const photographer: Photographer = {
            id: this.data.id,
            firstName: value.firstName,
            lastName: value.lastName,
            birthday: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())),
            notes: value.notes
        };
        this.photographersService.update(photographer).subscribe();
        this.dialogRef.close();
    }

    get firstName() {
        return this.photographerUpdateForm.get('firstName');
    }

    get lastName() {
        return this.photographerUpdateForm.get('lastName');
    }

    get birthday() {
        return this.photographerUpdateForm.get('birthday');
    }

    get notes() {
        return this.photographerUpdateForm.get('notes');
    }

}
