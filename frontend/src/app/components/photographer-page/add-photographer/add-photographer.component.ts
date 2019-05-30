import {Component} from '@angular/core';
import {PhotographersService} from '../../../providers/photographers/photographers.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewPhotographer} from '../../../interfaces/photographer';
import {validateBirthDay} from '../../../validators/birthday.validator';

@Component({
    selector: 'app-add-photographer',
    templateUrl: './add-photographer.component.html',
    styleUrls: ['./add-photographer.component.scss']
})
export class AddPhotographerComponent {

    photographerForm: FormGroup;

    constructor(private photographersService: PhotographersService,
                private fb: FormBuilder) {
        this.photographerForm = fb.group({
            firstName: ['', Validators.maxLength(100)],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            birthday: [AddPhotographerComponent.yesterDay(), [validateBirthDay]],
            notes: ['']
        });
    }
    
    private static yesterDay() : Date {
        let date = new Date();
        date.setDate(date.getDate() -1);
        return date;
    }


    submit() {
        const value = this.photographerForm.value;
        let date = value.birthday;
        const newPhotographer: NewPhotographer = {
            firstName: value.firstName,
            lastName: value.lastName,
            birthday: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())),
            notes: value.notes
        };

        this.photographersService.add(newPhotographer).subscribe();

        this.photographerForm.reset({
            firstName: '',
            lastName: '',
            birthday: AddPhotographerComponent.yesterDay(),
            notes: ''
        });
    }

    get firstName() {
        return this.photographerForm.get('firstName');
    }

    get lastName() {
        return this.photographerForm.get('lastName');
    }

    get birthday() {
        return this.photographerForm.get('birthday');
    }

    get notes() {
        return this.photographerForm.get('notes');
    }
}
