import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {


  searchForm: FormGroup;
  options: string[] = ['One', 'Two', 'Three'];

  private submit() {}

  constructor(private fb: FormBuilder) {
    this.searchForm = fb.group({
      searchValue: ['', Validators.required]
    });
  }

}
