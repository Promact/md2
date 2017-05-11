import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2Accordion } from './accordion';
import { Md2AccordionTab, Md2AccordionHeader } from './accordiontab';

export * from './accordion';
export * from './accordiontab';

@NgModule({
  imports: [CommonModule],
  exports: [Md2Accordion, Md2AccordionTab, Md2AccordionHeader],
  declarations: [Md2Accordion, Md2AccordionTab, Md2AccordionHeader],
})
export class Md2AccordionModule { }
