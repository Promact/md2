import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Md2Select} from './select';
import {Md2Option} from './option';
import {OverlayModule} from '../core/overlay/overlay-directives';
import {MdRippleModule} from '../core/ripple/ripple';
import {OVERLAY_PROVIDERS} from '../core/overlay/overlay';
export * from './select';

@NgModule({
    imports: [CommonModule, OverlayModule, MdRippleModule],
    exports: [Md2Select, Md2Option],
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
