import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  RtlModule,
  PortalModule,
  OverlayModule,
  A11yModule,
  ProjectionModule,
  DefaultStyleCompatibilityModeModule,
} from './core/index';

import { Md2AccordionModule } from './accordion/index';
import { Md2AutocompleteModule } from './autocomplete/index';
import { Md2ChipsModule } from './chips/index';
import { Md2CollapseModule } from './collapse/index';
import { Md2ColorpickerModule } from './colorpicker/index';
import { Md2DataTableModule } from './data-table/index';
import { Md2DatepickerModule } from './datepicker/index';
import { Md2DialogModule } from './dialog/index';
import { Md2MenuModule } from './menu/index';
import { Md2MultiselectModule } from './multiselect/index';
import { Md2SelectModule } from './select/index';
import { Md2TabsModule } from './tabs/index';
import { Md2TagsModule } from './tags/index';
import { Md2ToastModule } from './toast/index';
import { Md2TooltipModule } from './tooltip/index';

import { PlatformModule } from './core/platform/index';


const MD2_MODULES = [
  Md2AccordionModule,
  Md2AutocompleteModule,
  Md2ChipsModule,
  Md2CollapseModule,
  Md2ColorpickerModule,
  Md2DataTableModule,
  Md2DatepickerModule,
  Md2DialogModule,
  Md2MenuModule,
  Md2MultiselectModule,
  Md2SelectModule,
  Md2TabsModule,
  Md2TagsModule,
  Md2ToastModule,
  Md2TooltipModule,
  OverlayModule,
  PortalModule,
  RtlModule,
  A11yModule,
  PlatformModule,
  ProjectionModule,
  DefaultStyleCompatibilityModeModule,
];

@NgModule({
  imports: [
    Md2AccordionModule.forRoot(),
    Md2AutocompleteModule.forRoot(),
    Md2ChipsModule.forRoot(),
    Md2CollapseModule.forRoot(),
    Md2ColorpickerModule.forRoot(),
    Md2DataTableModule.forRoot(),
    Md2DatepickerModule.forRoot(),
    Md2DialogModule.forRoot(),
    Md2MenuModule.forRoot(),
    Md2MultiselectModule.forRoot(),
    Md2SelectModule.forRoot(),
    Md2TabsModule.forRoot(),
    Md2TagsModule.forRoot(),
    Md2ToastModule.forRoot(),
    Md2TooltipModule.forRoot(),
    PortalModule.forRoot(),
    ProjectionModule.forRoot(),
    RtlModule.forRoot(),
    A11yModule.forRoot(),
    PlatformModule.forRoot(),
    OverlayModule.forRoot(),
    DefaultStyleCompatibilityModeModule.forRoot(),
  ],
  exports: MD2_MODULES,
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
