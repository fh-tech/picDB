import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImagePageComponent} from '../components/image-page/image-page.component';
import {ChooseFolderPageComponent} from '../components/choose-folder-page/choose-folder-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'chooseFolder'},
  {path: 'chooseFolder', component: ChooseFolderPageComponent},
  {path: 'images', component: ImagePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
