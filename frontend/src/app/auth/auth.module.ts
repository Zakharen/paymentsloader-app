import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  exports: [
    AuthComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
