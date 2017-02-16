import {
  Component,
  Output,
  Input,
  EventEmitter,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  Directive,
  ViewContainerRef,
  TemplateRef,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Overlay,
  OverlayState,
  OverlayRef,
  OverlayModule,
  TemplatePortalDirective
} from '../core/core';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/first';

import { zoomInContent } from './dialog-animations';

@Directive({ selector: '[md2DialogPortal]' })
export class Md2DialogPortal extends TemplatePortalDirective {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}

@Directive({ selector: 'md2-dialog-title' })
export class Md2DialogTitle { }

@Directive({ selector: 'md2-dialog-footer' })
export class Md2DialogFooter { }

@Component({
  moduleId: module.id,
  selector: 'md2-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['dialog.css'],
  host: {
    'tabindex': '0',
    '(body:keydown.esc)': '_handleEscKeydown($event)'
  },
  animations: [zoomInContent],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'md2Dialog'
})
export class Md2Dialog implements OnDestroy {

  private _panelOpen = false;
  private _overlayRef: OverlayRef = null;
  private _backdropSubscription: Subscription;

  constructor(private _overlay: Overlay) { }

  @Output() onOpen: EventEmitter<Md2Dialog> = new EventEmitter<Md2Dialog>();
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  /** The portal to send the dialog content through */
  @ViewChild(Md2DialogPortal) _portal: Md2DialogPortal;

  @Input('title') dialogTitle: string;

  ngOnDestroy() { this.destroyPanel(); }

  /** Open the dialog */
  open(): Promise<Md2Dialog> {
    if (this._panelOpen) {
      return Promise.resolve<Md2Dialog>(this);
    }
    this._createOverlay();
    this._overlayRef.attach(this._portal);
    this._subscribeToBackdrop();
    this._panelOpen = true;
    return Promise.resolve<Md2Dialog>(this);
  }

  /** Close the dialog */
  close(): Promise<Md2Dialog> {
    this._panelOpen = false;
    if (this._overlayRef) {
      this._overlayRef.detach();
      this._backdropSubscription.unsubscribe();
    }
    return Promise.resolve<Md2Dialog>(this);
  }

  /** Removes the panel from the DOM. */
  destroyPanel(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;

      this._cleanUpSubscriptions();
    }
  }

  _onPanelDone(): void {
    if (this._panelOpen) {
      this.onOpen.emit(this);
    } else {
      this.onClose.emit();
    }
  }

  _handleEscKeydown(event: KeyboardEvent) {
    this.close();
  }

  private _subscribeToBackdrop(): void {
    this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
      this.close();
    });
  }

  private _createOverlay(): void {
    if (!this._overlayRef) {
      let config = new OverlayState();
      config.positionStrategy = this._overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically();
      config.hasBackdrop = true;
      config.backdropClass = 'cdk-overlay-dark-backdrop';

      this._overlayRef = this._overlay.create(config);
    }
  }

  private _cleanUpSubscriptions(): void {
    if (this._backdropSubscription) {
      this._backdropSubscription.unsubscribe();
    }
  }

}

export const MD2_DIALOG_DIRECTIVES: any[] = [
  Md2Dialog,
  Md2DialogTitle,
  Md2DialogFooter,
  Md2DialogPortal
];

@NgModule({
  imports: [CommonModule, OverlayModule],
  exports: MD2_DIALOG_DIRECTIVES,
  declarations: MD2_DIALOG_DIRECTIVES,
})
export class Md2DialogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2DialogModule,
      providers: []
    };
  }
}
