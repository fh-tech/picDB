import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImagePageComponent} from '../components/image-page/image-page.component';
import {FolderChoosePageComponent} from '../components/folder-choose-page/folder-choose-page.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'folder'},
  {path: 'folder', component: FolderChoosePageComponent},
  {path: 'images', component: ImagePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
