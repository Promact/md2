import {NgModule, ModuleWithProviders} from '@angular/core';
import {Md2AccordionModule} from 'md2/accordion';
import {Md2AutocompleteModule} from 'md2/autocomplete';
import {Md2CollapseModule} from 'md2/collapse';
import {Md2ColorpickerModule} from 'md2/colorpicker';
import {Md2DatepickerModule} from 'md2/datepicker';
import {Md2DialogModule} from 'md2/dialog';
import {Md2MenuModule} from 'md2/menu';
import {Md2MultiselectModule} from 'md2/multiselect';
import {Md2SelectModule} from 'md2/select';
import {Md2TabsModule} from 'md2/tabs';
import {Md2TagsModule} from 'md2/tags';
import {Md2ToastModule} from 'md2/toast';
import {Md2TooltipModule} from 'md2/tooltip';

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
