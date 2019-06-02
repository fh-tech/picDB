import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignalRService} from '../../../providers/signal-r/signal-r.service';
import {ImageService} from '../../../providers/image/image.service';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
    
    @Input() private options: string[] = [];
    @Output() onChooseOption = new EventEmitter<string>();
    @Output() onStartSearch = new EventEmitter<string>();

    private searchForm: FormGroup;

    submit() {
        this.onStartSearch.emit(this.searchForm.value.searchValue);
    }

    constructor(private imageService: ImageService,
                private signalR: SignalRService,
                private fb: FormBuilder) {

        this.searchForm = fb.group({
            searchValue: ['', Validators.required]
        });
    }

    private optionChosen(option) {
        this.onChooseOption.emit(option);
    }

   

   

}
