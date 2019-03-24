import {Injectable, NgZone} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {FolderService} from '../folder/folder.service';
import {Observable} from 'rxjs';
import {NavigatorService} from '../navigator/navigator.service';

@Injectable()
export class ChooseFolderGuardService implements CanActivate {
    constructor(private folderService: FolderService,
                private navigator: NavigatorService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.folderService.photofolder) {
            this.navigator.navigate(['images']);
            return false;
        }
        return true;
    }
}
