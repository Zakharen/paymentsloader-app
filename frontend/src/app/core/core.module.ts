import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material';
import {RequestHelperService, LoaderService} from './services';
import {CredentialsGuard} from './guards/credentials.guard';

import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    MaterialModule,
    TranslateModule,
  ],
  declarations: [],
  providers: [
    RequestHelperService,
    CredentialsGuard,
    LoaderService,
  ]
})
export class CoreModule {}
