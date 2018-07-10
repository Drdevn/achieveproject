import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontPageComponent } from './front-page/front-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './auth.guard';
import { AchiveComponent } from './achive/achive.component';
import {GroupsComponent} from './groups/groups.component';
import {AchieveCreateComponent} from './achieve-create/achieve-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/front-page', pathMatch: 'full' },
  { path: 'front-page', component: FrontPageComponent },
  { path: 'userpage', component: UserPageComponent, canActivate: [AuthGuard]},
  { path: 'achieves', component: AchiveComponent},
  { path: 'groups/:id', component: GroupsComponent},
  { path: 'achieve-create', component: AchieveCreateComponent },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  FrontPageComponent,
  UserPageComponent,
  AchiveComponent,
  GroupsComponent,
  AchieveCreateComponent,
  PageNotFoundComponent
];
