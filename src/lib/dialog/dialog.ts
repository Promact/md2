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
  OVERLAY_PROVIDERS,
  OverlayState,
  OverlayRef,
  OverlayModule,
  TemplatePortalDirective,
  ESCAPE
} from '../core/core';

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
    '(body:keydown.esc)': '_handleDocumentKeydown($event)'
  },
  animations: [zoomInContent],
  encapsulation: ViewEncapsulation.None,
})
export class Md2Dialog implements OnDestroy {
  constructor(private _overlay: Overlay) { }

  @Output() onOpen: EventEmitter<Md2Dialog> = new EventEmitter<Md2Dialog>();
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  /** The portal to send the dialog content through */
  @ViewChild(Md2DialogPortal) _portal: Md2DialogPortal;

  /** Is the dialog active? */
  _isOpened: boolean = false;

  @Input('title') dialogTitle: string;

  /** Overlay configuration for positioning the dialog */
  @Input() config = new OverlayState();

  /** @internal */
  private _overlayRef: OverlayRef = null;

  ngOnDestroy(): any {
    return this.close();
  }

  /** Show the dialog */
  show(): Promise<Md2Dialog> {
    return this.open();
  }

  /** Open the dialog */
  open(): Promise<Md2Dialog> {
    return this.close()
      .then(() => this._overlay.create(this.config))
      .then((ref: OverlayRef) => {
        this._overlayRef = ref;
        return ref.attach(this._portal);
      })
      .then(() => {
        this._isOpened = true;
        this.onOpen.emit(this);
        return this;
      });
  }

  /** Close the dialog */
  close(result: any = true, cancel: boolean = false): Promise<Md2Dialog> {
    if (!this._overlayRef) {
      return Promise.resolve<Md2Dialog>(this);
    }
    this._isOpened = false;
    this._overlayRef.detach()
    this._overlayRef.dispose();
    this._overlayRef = null;
    if (cancel) {
      this.onCancel.emit(result);
    } else {
      this.onClose.emit(result);
    }
    return Promise.resolve<Md2Dialog>(this);
  }

  _handleDocumentKeydown(event: KeyboardEvent) {
    this.close();
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
