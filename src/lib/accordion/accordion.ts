import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Md2Accordion } from './accordionpanel';
import {Md2AccordionTab } from './accordiontab';

export {Md2Accordion} from './accordionpanel';
export {Md2AccordionTab} from './accordiontab';

export const MD2_ACCORDION_DIRECTIVES: any[] = [Md2Accordion, Md2AccordionTab];

@NgModule({
  declarations: MD2_ACCORDION_DIRECTIVES,
  imports: [CommonModule],
  exports: MD2_ACCORDION_DIRECTIVES,
})
export class Md2AccordionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2AccordionModule,
      providers: []
    };
  }
}