import {TestBed} from '@angular/core/testing';

import {NavigatorService} from './navigator.service';
import {AppRoutingModule} from '../../modules/app-routing.module';
import {ChooseFolderPageComponent} from '../../components/choose-folder-page/choose-folder-page.component';
import {ImagePageComponent} from '../../components/image-page/image-page.component';

describe('NavigatorService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [ChooseFolderPageComponent, ImagePageComponent],
        providers: [NavigatorService],
        imports: [AppRoutingModule]
    }));

    // it('should be created', () => {
    //     const service: NavigatorService = TestBed.get(NavigatorService);
    //     expect(service).toBeTruthy();
    // });
});
