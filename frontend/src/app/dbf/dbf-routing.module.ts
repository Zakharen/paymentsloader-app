import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbfComponent } from './dbf.component';
import { AuthGuard } from '../auth';

const routes: Routes = [
  {
    path: '',
    component: DbfComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbfRoutingModule { }
