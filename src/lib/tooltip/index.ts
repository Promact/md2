import {NgModule, ModuleWithProviders} from '@angular/core';
import {OverlayModule, CompatibilityModule} from '../core';
import {PlatformModule} from '../core/platform/index';
import {Md2Tooltip, Md2TooltipComponent} from './tooltip';


@NgModule({
  imports: [OverlayModule, CompatibilityModule, PlatformModule],
  exports: [Md2Tooltip, Md2TooltipComponent, CompatibilityModule],
  declarations: [Md2Tooltip, Md2TooltipComponent],
  entryComponents: [Md2TooltipComponent],
})
export class Md2TooltipModule {
  /** @deprecated */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2TooltipModule,
      providers: []
    };
  }
}


export * from './tooltip';
