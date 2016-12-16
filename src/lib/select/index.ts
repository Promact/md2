import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Md2Select} from './select';
import {Md2Option} from './option';
import {
  DefaultStyleCompatibilityModeModule,
  OVERLAY_PROVIDERS,
  MdRippleModule,
  OverlayModule,
} from '../core';
export * from './select';
export {Md2Option} from './option';
export {fadeInContent, transformPanel, transformPlaceholder} from './select-animations';


@NgModule({
  imports: [CommonModule, OverlayModule, MdRippleModule, DefaultStyleCompatibilityModeModule],
  exports: [Md2Select, Md2Option, DefaultStyleCompatibilityModeModule],
  declarations: [Md2Select, Md2Option],
})
export class Md2SelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2SelectModule,
      providers: [OVERLAY_PROVIDERS]
    };
  }
}
