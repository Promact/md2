import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Md2Accordion } from './accordionpanel';
import { Md2AccordionTab, Md2AccordionHeader } from './accordiontab';

export * from './accordionpanel';
export * from './accordiontab';

export const MD2_ACCORDION_DIRECTIVES: any[] = [Md2Accordion, Md2AccordionTab, Md2AccordionHeader];

@NgModule({
  imports: [CommonModule],
  exports: MD2_ACCORDION_DIRECTIVES,
  declarations: MD2_ACCORDION_DIRECTIVES,
})
export class Md2AccordionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2AccordionModule,
      providers: []
    };
  }
}
