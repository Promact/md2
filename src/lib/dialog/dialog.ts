import {
  Component,
  Output,
  Input,
  ContentChild,
  EventEmitter,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectionStrategy,
  //Provider,
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
  TemplatePortal
} from '../core/core';
import { Animate } from './animate';

@Directive({ selector: '[md2DialogPortal]' })
export class Md2DialogPortal extends TemplatePortal {
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
    '(body:keydown)': 'onDocumentKeypress($event)'
  },
  encapsulation: ViewEncapsulation.None,
})
export class Md2Dialog implements OnDestroy {
  constructor(private overlay: Overlay) { }

  @Output() onShow: EventEmitter<Md2Dialog> = new EventEmitter<Md2Dialog>();
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  /** The portal to send the dialog content through */
  @ViewChild(Md2DialogPortal) private portal: Md2DialogPortal;

  /** Is the dialog active? */
  private isOpened: boolean = false;

  @Input('title') dialogTitle: string;

  /** Overlay configuration for positioning the dialog */
  @Input() config = new OverlayState();

  /** @internal */
  private overlayRef: OverlayRef = null;

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
      .then(() => this.overlay.create(this.config))
      .then((ref: OverlayRef) => {
        this.overlayRef = ref;
        return ref.attach(this.portal);
      })
      .then(() => Animate.wait())
      .then(() => {
        this.isOpened = true;
        this.onShow.emit(this);
        return this;
      });
  }

  /** Close the dialog */
  close(result: any = true, cancel: boolean = false): Promise<Md2Dialog> {
    if (!this.overlayRef) {
      return Promise.resolve<Md2Dialog>(this);
    }
    this.isOpened = false;
    // TODO(jd): this is terrible, use animate states
    return Animate.wait(100)
      .then(() => this.overlayRef.detach())
      .then(() => {
        this.overlayRef.dispose();
        this.overlayRef = null;
        if (cancel) {
          this.onCancel.emit(result);
        } else {
          this.onClose.emit(result);
        }
        return this;
      });
  }

  private onDocumentKeypress(event: KeyboardEvent) {
    if (event.keyCode == 27) {
      this.close();
    }
  }
}

export const MD2_DIALOG_DIRECTIVES: any[] = [Md2Dialog, Md2DialogTitle, Md2DialogFooter, Md2DialogPortal];

export const MD2_DIALOG_PROVIDERS: any[] = [Overlay, OVERLAY_PROVIDERS];

@NgModule({
  imports: [CommonModule],
  exports: MD2_DIALOG_DIRECTIVES,
  declarations: MD2_DIALOG_DIRECTIVES,
})
export class Md2DialogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2DialogModule,
      providers: MD2_DIALOG_PROVIDERS
    };
  }
}