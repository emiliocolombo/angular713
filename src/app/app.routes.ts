import { Routes } from '@angular/router';
import { BeerPageComponent } from './components/beer-page/beer-page.component';
import { AboutComponent } from './components/about/about.component';


export const routes: Routes = [
    {path: '', component: BeerPageComponent},
    {path: 'about', component: AboutComponent},
];
