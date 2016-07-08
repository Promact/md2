import {AppComponent} from './app';
import {bootstrap} from "@angular/platform-browser-dynamic";
import {provide} from "@angular/core";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {MATERIAL_BROWSER_PROVIDERS}from '../core/core'

bootstrap( AppComponent, [
    ROUTER_PROVIDERS, MATERIAL_BROWSER_PROVIDERS,
    provide( LocationStrategy, { useClass: HashLocationStrategy })
] );