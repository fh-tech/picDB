import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImagePageComponent} from '../components/image-page/image-page.component';
import {ChooseFolderPageComponent} from '../components/choose-folder-page/choose-folder-page.component';
import {ImageFolderGuardService} from '../providers/guards/image-folder-guard.service';
import {ChooseFolderGuardService} from '../providers/guards/choose-folder-guard.service';
import {PhotographerPageComponent} from '../components/photographer-page/photographer-page.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'chooseFolder'},
    {path: 'chooseFolder', component: ChooseFolderPageComponent, canActivate: [ChooseFolderGuardService]},
    {path: 'images', component: ImagePageComponent, canActivate: [ImageFolderGuardService]},
    {path: 'photographers', component: PhotographerPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
