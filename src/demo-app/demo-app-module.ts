import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {DemoApp, Home} from './demo-app/demo-app';
import {RouterModule} from '@angular/router';
import {Md2Module} from 'md2/all';
import {DEMO_APP_ROUTES} from './demo-app/routes';

import {AccordionDemo} from './accordion/accordion-demo';
import {AutocompleteDemo} from './autocomplete/autocomplete-demo';
import {CollapseDemo} from './collapse/collapse-demo';
import {ColorpickerDemo} from './colorpicker/colorpicker-demo';
import {DatepickerDemo} from './datepicker/datepicker-demo';
import {DialogDemo} from './dialog/dialog-demo';
import {MenuDemo} from './menu/menu-demo';
import {MultiselectDemo} from './multiselect/multiselect-demo';
import {SelectDemo} from './select/select-demo';
import {TabsDemo} from './tabs/tabs-demo';
import {TagsDemo} from './tags/tags-demo';
import {TextareaDemo} from './textarea/textarea-demo';
import {ToastDemo} from './toast/toast-demo';
import {TooltipDemo} from './tooltip/tooltip-demo';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(DEMO_APP_ROUTES),
    Md2Module.forRoot(),
  ],
  declarations: [
    AccordionDemo,
    AutocompleteDemo,
    CollapseDemo,
    ColorpickerDemo,
    DatepickerDemo,
    DemoApp,
    DialogDemo,
    Home,
    MenuDemo,
    MultiselectDemo,
    SelectDemo,
    TabsDemo,
    TagsDemo,
    TextareaDemo,
    ToastDemo,
    TooltipDemo,
  ],
  entryComponents: [
    DemoApp,
  ],
})
export class DemoAppModule {
  constructor(private _appRef: ApplicationRef) { }

  ngDoBootstrap() {
    this._appRef.bootstrap(DemoApp);
  }
}
