import {AppComponent} from './app';
import {bootstrap} from "@angular/platform-browser-dynamic";
import {provide} from "@angular/core";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {DIALOG_PROVIDERS}from '../components/dialog/dialog'

bootstrap( AppComponent, [
    ROUTER_PROVIDERS, DIALOG_PROVIDERS,
    provide( LocationStrategy, { useClass: HashLocationStrategy })
] );