import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {AuthGuard} from '../auth';
import {CredentialsGuard} from '../core/guards/credentials.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [
        AuthGuard,
        CredentialsGuard,
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
