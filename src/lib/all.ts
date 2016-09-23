import {NgModule, ModuleWithProviders} from '@angular/core';
import {Md2AccordionModule} from './accordion/accordion';
import {Md2AutocompleteModule} from './autocomplete/autocomplete';
import {Md2CollapseModule} from './collapse/collapse';
import {Md2ColorpickerModule} from './colorpicker/colorpicker';
import {Md2DatepickerModule} from './datepicker/datepicker';
import {Md2DialogModule} from './dialog/dialog';
import {Md2MenuModule} from './menu/menu';
import {Md2MultiselectModule} from './multiselect/multiselect';
import {Md2SelectModule} from './select/select';
import {Md2TabsModule} from './tabs/tabs';
import {Md2TagsModule} from './tags/tags';
import {Md2ToastModule} from './toast/toast';
import {Md2TooltipModule} from './tooltip/tooltip';

const MD2_MODULES = [
  Md2AccordionModule,
  Md2AutocompleteModule,
  Md2CollapseModule,
  Md2ColorpickerModule,
  Md2DatepickerModule,
  Md2DialogModule,
  Md2MenuModule,
  Md2MultiselectModule,
  Md2SelectModule,
  Md2TabsModule,
  Md2TagsModule,
  Md2ToastModule,
  Md2TooltipModule,
];

@NgModule({
  imports: [
    Md2AccordionModule.forRoot(),
    Md2AutocompleteModule.forRoot(),
    Md2CollapseModule.forRoot(),
    Md2ColorpickerModule,
    Md2DatepickerModule.forRoot(),
    Md2DialogModule.forRoot(),
    Md2MenuModule.forRoot(),
    Md2MultiselectModule.forRoot(),
    Md2SelectModule.forRoot(),
    Md2TabsModule.forRoot(),
    Md2TagsModule.forRoot(),
    Md2ToastModule.forRoot(),
    Md2TooltipModule.forRoot(),
  ],
  exports: MD2_MODULES,
  providers: []
})
export class Md2RootModule { }


@NgModule({
  imports: MD2_MODULES,
  exports: MD2_MODULES,
})
export class Md2Module {
  static forRoot(): ModuleWithProviders {
    return { ngModule: Md2RootModule };
  }
}
