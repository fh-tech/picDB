import {Component, OnInit} from '@angular/core';
import {PhotographersService} from '../../../providers/photographers/photographers.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewPhotographer} from "../../../interfaces/photographer";

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
            firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
            lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
        });
    }


    submit() {
        const value = this.photographerForm.value;
        const newPhotographer: NewPhotographer = {
            firstName: value.firstName,
            lastName: value.lastName
        };

        this.photographersService.add(newPhotographer);

        this.photographerForm.reset({
            firstName: '',
            lastName: ''
        });
    }

    get firstName() {
        return this.photographerForm.get('firstName');
    }

    get lastName() {
        return this.photographerForm.get('lastName');
    }
}
