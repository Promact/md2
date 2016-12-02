import {
  Component,
  ContentChild,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  ViewContainerRef,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Overlay,
  OverlayState,
  OverlayRef,
  TemplatePortal,
  OVERLAY_PROVIDERS
} from '../core';
import { Subscription } from 'rxjs/Subscription';

import { Md2MenuContent } from './menu-content';
import { Md2MenuItem } from './menu-item';
import { Md2MenuTrigger } from './menu-trigger';
export { Md2MenuContent } from './menu-content';
export { Md2MenuItem } from './menu-item';
export { Md2MenuTrigger } from './menu-trigger';


@Component({
  moduleId: module.id,
  selector: '[md2-menu]',
  template: '<ng-content></ng-content>',
  styleUrls: ['menu.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Md2Menu {

  private _portal: TemplatePortal;
  private _backdropSubscription: Subscription;

  _overlayRef: OverlayRef;
  _menuInstance: Md2MenuContent;

  //@ViewChild(Md2MenuTrigger) trigger: Md2MenuTrigger;
  //@ViewChild(Md2MenuContent) menu: Md2MenuContent;
  @ContentChild(Md2MenuTrigger) trigger: Md2MenuTrigger;
  @ContentChild(Md2MenuContent) menu: Md2MenuContent;

  constructor(private _overlay: Overlay, private _element: ElementRef, private _viewContainerRef: ViewContainerRef) { }

  ngAfterContentInit() {
    if (this.trigger && this.menu) {
      this.trigger.onMenuOpen.subscribe(() => {
        if (!this._menuInstance) {
          let strategy = this._overlay.position().connectedTo(this._element, { originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition(
            { originX: 'end', originY: 'top' },
            { overlayX: 'end', overlayY: 'top' })
            .withFallbackPosition(
            { originX: 'start', originY: 'bottom' },
            { overlayX: 'start', overlayY: 'bottom' })
            .withFallbackPosition(
            { originX: 'end', originY: 'bottom' },
            { overlayX: 'end', overlayY: 'bottom' });
          let config = new OverlayState();
          config.positionStrategy = strategy;
          config.hasBackdrop = true;

          this._overlayRef = this._overlay.create(config);
          this._portal = new TemplatePortal(this.menu.templateRef, this._viewContainerRef);
          this._menuInstance = this._overlayRef.attach(this._portal).instance;
          this._subscribeToBackdrop();
        }
      });
      this.trigger.onMenuClose.subscribe(() => {
        this._overlayRef.dispose();
        this._backdropSubscription.unsubscribe();
        this._overlayRef = null;
        this._menuInstance = null;
      });
    }
  }

  private _subscribeToBackdrop(): void {
    this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
      this.trigger.closeMenu();
    });
  }

}

@NgModule({
  imports: [CommonModule],
  exports: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
  declarations: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
})
export class Md2MenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2MenuModule,
      providers: OVERLAY_PROVIDERS,
    };
  }
}
