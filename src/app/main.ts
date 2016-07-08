import {AppComponent} from './app';
import {bootstrap} from "@angular/platform-browser-dynamic";
import {provide} from "@angular/core";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {OVERLAY_PROVIDERS}from '../components/dialog/overlay'

bootstrap( AppComponent, [
    ROUTER_PROVIDERS, OVERLAY_PROVIDERS,
    provide( LocationStrategy, { useClass: HashLocationStrategy })
] );