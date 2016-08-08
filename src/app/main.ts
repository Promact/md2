import {AppComponent} from './app';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {LocationStrategy, PathLocationStrategy } from '@angular/common';
import {provideRouter} from '@angular/router';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {DIALOG_PROVIDERS} from '../components/dialog/dialog';
import {routes} from './routes';

bootstrap(AppComponent, [
  DIALOG_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  provideRouter(routes),
  provide(LocationStrategy, { useClass: PathLocationStrategy })
]);
