import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoApp, Home} from './demo-app/demo-app';
import {RouterModule} from '@angular/router';
import {Md2Module} from 'md2';
import {DEMO_APP_ROUTES} from './demo-app/routes';
import {AccordionDemo} from './accordion/accordion-demo';
import {AutocompleteDemo} from './autocomplete/autocomplete-demo';
import {ChipsDemo} from './chips/chips-demo';
import {CollapseDemo} from './collapse/collapse-demo';
import {ColorpickerDemo} from './colorpicker/colorpicker-demo';
import {DataTableDemo, DataTablePipe} from './data-table/data-table-demo';
import {DatepickerDemo} from './datepicker/datepicker-demo';
import {DialogDemo} from './dialog/dialog-demo';
import {MenuDemo} from './menu/menu-demo';
import {SelectDemo} from './select/select-demo';
import {TabsDemo} from './tabs/tabs-demo';
import {TagsDemo} from './tags/tags-demo';
import {ToastDemo} from './toast/toast-demo';
import {TooltipDemo} from './tooltip/tooltip-demo';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(DEMO_APP_ROUTES, { useHash: true }),
    Md2Module.forRoot(),
  ],
  declarations: [
    DemoApp,
    Home,
    AccordionDemo,
    AutocompleteDemo,
    ChipsDemo,
    CollapseDemo,
    ColorpickerDemo,
    DataTableDemo,
    DataTablePipe,
    DatepickerDemo,
    DialogDemo,
    MenuDemo,
    SelectDemo,
    TabsDemo,
    TagsDemo,
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
