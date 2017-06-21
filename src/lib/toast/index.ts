import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, MdCommonModule } from '../core';
import { PlatformModule } from '../core/platform/index';
import { Md2Toast, Md2ToastConfig, Md2ToastComponent } from './toast';

export * from './toast';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    MdCommonModule,
    PlatformModule
  ],
  exports: [Md2ToastComponent, MdCommonModule],
  declarations: [Md2ToastComponent],
  entryComponents: [Md2ToastComponent],
  providers: [Md2Toast, Md2ToastConfig],
})
export class Md2ToastModule { }
