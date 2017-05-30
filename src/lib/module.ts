import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  MdRippleModule,
  RtlModule,
  PortalModule,
  OverlayModule,
  A11yModule,
  CompatibilityModule,
  MdNativeDateModule,
} from './core/index';

import { Md2AccordionModule } from './accordion/index';
import { Md2AutocompleteModule } from './autocomplete/index';
import { Md2ChipsModule } from './chips/index';
import { Md2CollapseModule } from './collapse/index';
import { Md2ColorpickerModule } from './colorpicker/index';
import { Md2DataTableModule } from './data-table/index';
//import { Md2DatepickerModule } from './datepicker/index';
import { Md2Datepicker2Module } from './datepicker2/index';
import { Md2DialogModule } from './dialog/index';
import { Md2MenuModule } from './menu/index';
import { Md2SelectModule } from './select/index';
import { Md2TabsModule } from './tabs/index';
import { Md2TagsModule } from './tags/index';
import { Md2ToastModule } from './toast/index';
import { Md2TooltipModule } from './tooltip/index';

import { PlatformModule } from './core/platform/index';
import { StyleModule } from './core/style/index';

const MD2_MODULES = [
  Md2AccordionModule,
  Md2AutocompleteModule,
  Md2ChipsModule,
  Md2CollapseModule,
  Md2ColorpickerModule,
  Md2DataTableModule,
  //Md2DatepickerModule,
  Md2Datepicker2Module,
  Md2DialogModule,
  Md2MenuModule,
  MdRippleModule,
  Md2SelectModule,
  Md2TabsModule,
  Md2TagsModule,
  Md2ToastModule,
  Md2TooltipModule,
  OverlayModule,
  PortalModule,
  RtlModule,
  StyleModule,
  A11yModule,
  PlatformModule,
  CompatibilityModule,
  MdNativeDateModule,
];

@NgModule({
  imports: MD2_MODULES,
  exports: MD2_MODULES,
})
export class Md2Module { }
