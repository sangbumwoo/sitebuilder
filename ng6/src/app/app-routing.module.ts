import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component'
import { PageComponent } from './page/page.component'
import { SettingComponent } from './setting/setting.component'

const routes: Routes = [
  // {path:'', redirectTo:'/home'},
  {path:':id/list', component:ListComponent},
  {path:':id/page', component:PageComponent},
  {path:':id/setting', component:SettingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
