import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontPageComponent } from './front-page/front-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/front-page', pathMatch: 'full' },
  { path: 'front-page', component: FrontPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
