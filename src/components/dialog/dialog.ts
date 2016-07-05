import { Component, OnDestroy, Input, Output, EventEmitter, Type, ElementRef, HostBinding, ViewEncapsulation } from '@angular/core';
import { ModalInstance, ModalResult } from './dialog-instance';

@Component({
  selector: 'md2-dialog',
  template: `
    <div class="md2-dialog" [class.open]="visible" tabindex="-1" role="dialog" aria-labelledby="myDialogLabel" aria-hidden="true" [style.display]="visible ? 'block' : 'none'">
      <div class="md2-dialog-container" role="document">
        <div class="md2-dialog-header">
          <button *ngIf="closeButton" type="button" class="close" aria-label="Close" (click)="hide()">&times;</button>
          <h2 *ngIf="dialogHeader" class="md2-dialog-title" id="myDialogLabel" [innerHtml]="dialogHeader"></h2>
          <ng-content select="dialog-header"></ng-content>
        </div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .md2-dialog-open { overflow-y: hidden; }
    .md2-dialog { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1050; background-color: rgba(33, 33, 33, 0.48); display: none; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch; outline: 0; }
    .md2-dialog.open { display: block; }
    .md2-dialog .md2-dialog-container { position: relative; width: auto; margin: 15px; background-color: #fff; -webkit-background-clip: padding-box; -moz-background-clip: padding-box; background-clip: padding-box; border-radius: 4px; outline: 0; -webkit-box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12); box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12); -webkit-transition: .3s; -o-transition: .3s; -moz-transition: .3s; transition: .3s; -webkit-transform: scale(0.1); -ms-transform: scale(0.1); -o-transform: scale(0.1); -moz-transform: scale(0.1); transform: scale(0.1); }
    .md2-dialog.open .md2-dialog-container { -webkit-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -moz-transform: scale(1); transform: scale(1); }
    @media (min-width: 768px) {
      .md2-dialog .md2-dialog-container { width: 600px; margin: 30px auto; }
    }
    .md2-dialog-header { background: #2196f3; color: #fff; font-size: 25px; line-height: 1.1; font-weight: 500; padding: 16px; border-bottom: 1px solid #e5e5e5; }
    .md2-dialog-header .close { position: relative;display: inline-block;width: 18px;height: 18px;margin-top: 4px;overflow: hidden;-webkit-appearance: none; padding: 0; cursor: pointer; background: 0 0; border: 0; float: right; opacity: 0.8; font-size: 0; }
    .md2-dialog-header .close::before,
    .md2-dialog-header .close::after {content: '';position: absolute;height: 2px;width: 100%;top: 50%;left: 0;margin-top: -1px;background: #fff;border-radius: 2px;height: 2px;}
    .md2-dialog-header .close::before {-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);}
    .md2-dialog-header .close::after {-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}
    .md2-dialog-header .close:hover { opacity: 1; }
    .md2-dialog-header .md2-dialog-title { margin: 0; font-size: 25px; line-height: 1.1; font-weight: 500; }
    .md2-dialog-header dialog-header { line-height: 33px; }
    .md2-dialog-body { position: relative; padding: 16px; }
    .md2-dialog-footer { padding: 16px; text-align: right; border-top: 1px solid rgba(0,0,0,0.12); }
  `],
  host: {
    //'(click)': 'clickElement($event)',
    'role': 'dialog',
    'class.md2-dialog': 'true',
    'tabindex': '-1'
  },
  encapsulation: ViewEncapsulation.None
})

//<div class="dialog-dialog" [ngClass]="{ 'dialog-sm': isSmall(), 'dialog-lg': isLarge() }">
//        <ng-content></ng-content>
//</div>
export class Md2Dialog implements OnDestroy {

  private overrideSize: string = null;

  instance: ModalInstance;
  visible: boolean = false;

  @Input() backdrop: string | boolean = true;
  @Input() keyboard: boolean = true;
  @Input() size: string;

  @Output() onClose: EventEmitter<any> = new EventEmitter(false);
  @Output() onDismiss: EventEmitter<any> = new EventEmitter(false);
  @Output() onOpen: EventEmitter<any> = new EventEmitter(false);

  @HostBinding('attr.data-keyboard') get dataKeyboardAttr(): boolean { return this.keyboard; }
  @HostBinding('attr.data-backdrop') get dataBackdropAttr(): string | boolean { return this.backdrop; }

  constructor(private element: ElementRef) {
    this.instance = new ModalInstance(this.element);

    this.instance.hidden.subscribe((result) => {
      this.visible = this.instance.visible;
      if (result === ModalResult.Dismiss)
        this.onDismiss.emit(undefined);
    });

    this.instance.shown.subscribe(() => {
      this.onOpen.emit(undefined);
    });
  }

  ngOnDestroy() {
    return this.instance && this.instance.destroy();
  }

  routerCanDeactivate(): any {
    return this.ngOnDestroy();
  }

  open(size?: string): Promise<void> {
    //if (ModalSize.validSize(size)) this.overrideSize = size;
    return this.instance.open().then(() => {
      this.visible = this.instance.visible;
    });
  }

  close(): Promise<void> {
    return this.instance.close().then(() => {
      this.onClose.emit(undefined);
    });
  }

  dismiss(): Promise<void> {
    return this.instance.dismiss();
  }

  //private isSmall() {
  //  return this.overrideSize !== ModalSize.Large
  //    && this.size === ModalSize.Small
  //    || this.overrideSize === ModalSize.Small;
  //}

  //private isLarge() {
  //  return this.overrideSize !== ModalSize.Small
  //    && this.size === ModalSize.Large
  //    || this.overrideSize === ModalSize.Large;
  //}
}

//export class ModalSize {
//  static Small = 'sm';
//  static Large = 'lg';

//  static validSize(size: string) {
//    return size && (size === ModalSize.Small || size === ModalSize.Large);
//  }
//}


//@Component({
//  selector: 'modal-header',
//  template: `
//        <div class="modal-header">
//            <button *ngIf="showClose" type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="modal.dismiss()">
//                <span aria-hidden="true">&times;</span>
//            </button>
//            <ng-content></ng-content>
//        </div>
//    `
//})
//export class ModalHeaderComponent {
//  @Input('show-close') showClose: boolean = false;
//  constructor(private modal: ModalComponent) { }
//}

//@Component({
//  selector: 'modal-body',
//  template: `
//        <div class="modal-body">
//            <ng-content></ng-content>
//        </div>
//    `
//})
//export class ModalBodyComponent {
//  constructor(private modal: ModalComponent) { }
//}

//@Component({
//  selector: 'modal-footer',
//  template: `
//        <div class="modal-footer">
//            <ng-content></ng-content>
//            <button *ngIf="showDefaultButtons" type="button" class="btn btn-default" data-dismiss="modal" (click)="modal.dismiss()">Close</button>
//            <button *ngIf="showDefaultButtons" type="button" class="btn btn-primary" (click)="modal.close()">Save</button>
//        </div>
//    `
//})
//export class ModalFooterComponent {
//  @Input('show-default-buttons') showDefaultButtons: boolean = false;
//  constructor(private modal: ModalComponent) { }
//}
