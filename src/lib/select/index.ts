import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2Select } from './select';
import { Md2OptionModule } from './option';
import { CompatibilityModule, OverlayModule } from '../core';


@NgModule({
  imports: [CommonModule, OverlayModule, Md2OptionModule, CompatibilityModule],
  exports: [Md2Select, Md2OptionModule, CompatibilityModule],
  declarations: [Md2Select],
})
export class Md2SelectModule {
  /** @deprecated */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2SelectModule,
      providers: []
    };
  }
}


export * from './select';
export * from './option';
export { fadeInContent, transformPanel, transformPlaceholder } from './select-animations';
