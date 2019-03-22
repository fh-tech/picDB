import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImagePageComponent} from '../components/image-page/image-page.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'images'},
    {path: 'images', component: ImagePageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
