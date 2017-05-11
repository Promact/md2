import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, MdCommonModule } from '../core';
import { PlatformModule } from '../core/platform/index';
import {
  Md2Dialog,
  Md2DialogTitle,
  Md2DialogContent,
  Md2DialogActions,
  Md2DialogPortal
} from './dialog';


@NgModule({
  imports: [CommonModule, OverlayModule, MdCommonModule, PlatformModule],
  exports: [
    Md2Dialog,
    Md2DialogTitle,
    Md2DialogContent,
    Md2DialogActions,
    Md2DialogPortal
  ],
  declarations: [
    Md2Dialog,
    Md2DialogTitle,
    Md2DialogContent,
    Md2DialogActions,
    Md2DialogPortal
  ],
  entryComponents: [Md2Dialog],
})
export class Md2DialogModule { }


export * from './dialog';
