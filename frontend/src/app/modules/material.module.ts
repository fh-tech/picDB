import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatOptionModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [],
    imports: [
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatOptionModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatTableModule,
        MatSelectModule,
        MatProgressBarModule,
        MatChipsModule,
        MatIconModule,
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatOptionModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatTableModule,
        MatSelectModule,
        MatProgressBarModule,
        MatChipsModule,
        MatIconModule,
    ]
})
export class MaterialModule {

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: MaterialModule,
            providers: []
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: MaterialModule) {
        if (parentModule) {
            throw new Error('MaterialModule is already loaded');
        }
    }
}
