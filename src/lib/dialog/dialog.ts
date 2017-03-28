import {
  Component,
  Output,
  Input,
  EventEmitter,
  Optional,
  SkipSelf,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  Directive,
  ViewContainerRef,
  TemplateRef,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ESCAPE,
  Overlay,
  OverlayState,
  OverlayRef,
  OverlayModule,
  TemplatePortalDirective
} from '../core/core';
import { extendObject } from '../core/util/object-extend';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/first';

export type DialogVisibility = 'initial' | 'visible' | 'hidden';
export type DialogRole = 'dialog' | 'alertdialog';

export class Md2DialogConfig {
  role?: DialogRole = 'dialog';
  disableClose?: boolean = false;
}

@Directive({ selector: '[md2DialogPortal]' })
export class Md2DialogPortal extends TemplatePortalDirective {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}

/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
@Directive({ selector: 'md2-dialog-title' })
export class Md2DialogTitle { }

/**
 * Scrollable content container of a dialog.
 */
@Directive({ selector: 'md2-dialog-content' })
export class Md2DialogContent { }

/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
@Directive({ selector: 'md2-dialog-footer, md2-dialog-actions' })
export class Md2DialogActions { }

@Component({
  moduleId: module.id,
  selector: 'md2-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['dialog.css'],
  host: {
    'tabindex': '0',
    '[attr.role]': 'config?.role',
  },
  animations: [
    trigger('state', [
      state('void', style({ transform: 'scale(0.3)' })),
      state('initial', style({ transform: 'scale(0.3)' })),
      state('visible', style({ transform: 'scale(1)' })),
      state('hidden', style({ transform: 'scale(0.3)' })),
      transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
      transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
    ])
  ],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'md2Dialog'
})
export class Md2Dialog implements OnDestroy {

  private _openDialogsAtThisLevel: Array<any> = [];
  private _boundKeydown = this._handleKeydown.bind(this);
  private _panelOpen = false;
  private _overlayRef: OverlayRef = null;
  private _backdropSubscription: Subscription;
  config: Md2DialogConfig;

  /** Property watched by the animation framework to show or hide the dialog */
  _visibility: DialogVisibility = 'initial';

  constructor(private _overlay: Overlay,
    @Optional() @SkipSelf() private _parentDialog: Md2Dialog) { }

  @Output() onOpen: EventEmitter<Md2Dialog> = new EventEmitter<Md2Dialog>();
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  /** The portal to send the dialog content through */
  @ViewChild(Md2DialogPortal) _portal: Md2DialogPortal;

  @Input('title') dialogTitle: string;

  ngOnDestroy() { this.destroyPanel(); }

  get _openDialogs(): Array<any> {
    return this._parentDialog ? this._parentDialog._openDialogs : this._openDialogsAtThisLevel;
  }

  /** Open the dialog */
  open(config?: Md2DialogConfig): Promise<Md2Dialog> {
    this.config = _applyConfigDefaults(config);
    if (this._panelOpen) {
      return Promise.resolve<Md2Dialog>(this);
    }
    this._createOverlay();
    this._overlayRef.attach(this._portal);
    this._subscribeToBackdrop();

    if (!this._openDialogs.length && !this._parentDialog) {
      document.addEventListener('keydown', this._boundKeydown);
    }

    this._openDialogs.push(this);
    this._panelOpen = true;
    this._visibility = 'visible';
    return Promise.resolve<Md2Dialog>(this);
  }

  /** Close the dialog */
  close(): Promise<Md2Dialog> {
    this._visibility = 'hidden';
    this._panelOpen = false;
    if (this._overlayRef) {
      this._overlayRef.detach();
      if (this._backdropSubscription) {
        this._backdropSubscription.unsubscribe();
      }
    }

    let index = this._openDialogs.indexOf(this);

    if (index > -1) {
      this._openDialogs.splice(index, 1);

      // no open dialogs are left, call next on afterAllClosed Subject
      if (!this._openDialogs.length) {
        document.removeEventListener('keydown', this._boundKeydown);
      }
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

  _handleKeydown(event: KeyboardEvent) {
    let topDialog = this._openDialogs[this._openDialogs.length - 1];

    if (event.keyCode === ESCAPE && topDialog &&
      !topDialog.config.disableClose) {
      topDialog.close();
    }
  }

  private _subscribeToBackdrop(): void {
    if (!this.config.disableClose) {
      this._backdropSubscription = this._overlayRef.backdropClick().first().subscribe(() =>
        this.close());
    }
  }

  private _createOverlay(): void {
    if (!this._overlayRef) {
      let config = new OverlayState();
      config.positionStrategy = this._overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically();
      config.hasBackdrop = true;

      this._overlayRef = this._overlay.create(config);
    }
  }

  private _cleanUpSubscriptions(): void {
    if (this._backdropSubscription) {
      this._backdropSubscription.unsubscribe();
    }
  }

}

/**
 * Applies default options to the dialog config.
 * @param dialogConfig Config to be modified.
 * @returns The new configuration object.
 */
function _applyConfigDefaults(dialogConfig: Md2DialogConfig): Md2DialogConfig {
  return extendObject(new Md2DialogConfig(), dialogConfig);
}

export const MD2_DIALOG_DIRECTIVES: any[] = [
  Md2Dialog,
  Md2DialogTitle,
  Md2DialogContent,
  Md2DialogActions,
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
