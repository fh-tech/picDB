import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {FolderService} from '../folder.service';
import {Observable} from 'rxjs';
import {NavigatorService} from '../navigator.service';

@Injectable()
export class ImageFolderGuardService implements CanActivate {
    constructor(private folderService: FolderService,
                private navigator: NavigatorService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.folderService.photofolder) {
            this.navigator.navigate(['chooseFolder']);
            return false;
        }
        return true;
    }
}
