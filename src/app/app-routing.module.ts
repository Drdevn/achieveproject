import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontPageComponent } from './front-page/front-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './auth.guard';
import { AchiveComponent } from './achive/achive.component';
import {GroupsComponent} from './groups/groups.component';

const routes: Routes = [
  { path: '', redirectTo: '/front-page', pathMatch: 'full' },
  { path: 'front-page', component: FrontPageComponent },
  { path: 'userpage', component: UserPageComponent, canActivate: [AuthGuard]},
  { path: 'achieves', component: AchiveComponent},
  { path: 'groups', component: GroupsComponent},
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
