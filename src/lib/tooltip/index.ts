import {NgModule} from '@angular/core';
import {OverlayModule, MdCommonModule} from '../core';
import {PlatformModule} from '../core/platform/index';
import {Md2Tooltip, Md2TooltipComponent} from './tooltip';


@NgModule({
  imports: [OverlayModule, MdCommonModule, PlatformModule],
  exports: [Md2Tooltip, Md2TooltipComponent, MdCommonModule],
  declarations: [Md2Tooltip, Md2TooltipComponent],
  entryComponents: [Md2TooltipComponent],
})
export class Md2TooltipModule {}


export * from './tooltip';
