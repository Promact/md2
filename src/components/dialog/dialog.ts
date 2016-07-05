import { Component, Output, Input, AfterContentInit, ContentChild, EventEmitter, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import {Overlay, OVERLAY_PROVIDERS} from '../../core/overlay/overlay';
import {OverlayState} from '../../core/overlay/overlay-state';
import {OverlayRef} from '../../core/overlay/overlay-ref';
import {Animate} from '../../core/util/animate';
import {MdDialogPortal} from './dialog-portal';
//import {MdDialogActions} from './dialog-actions';
//import {MdDialogTitle} from './dialog-title';
import {KeyCodes} from '../../core/key_codes';

// TODO(jd): behavioral tests
// TODO(jd): backdrop and clickToClose options

@Component( {
    selector: 'md2-dialog',
    //directives: [MdDialogTitle, MdDialogActions],
    providers: [Overlay, OVERLAY_PROVIDERS],
    encapsulation: ViewEncapsulation.None,
    template: `
<template mdDialogPortal>
  <div class="md-dialog" [class.md-active]="active">
    <ng-content select="md-dialog-title"></ng-content>
    <ng-content></ng-content>
    <ng-content select="md-dialog-actions"></ng-content>  
  </div>
</template>
`,
    host: {
        'tabindex': '0',
        '(body:keydown)': 'onDocumentKeypress($event)'
    }
})
export class Md2Dialog implements AfterContentInit, OnDestroy {
    constructor( private overlay: Overlay ) {
        this.config.positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
    }

    @Output() onShow: EventEmitter<Md2Dialog> = new EventEmitter<Md2Dialog>();
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

    /** The portal to send the dialog content through */
    @ViewChild( MdDialogPortal ) private portal: MdDialogPortal;

    /** Dialog actions */
    //@ContentChild( MdDialogActions ) private actions: MdDialogActions;

    /** Is the dialog active? */
    private active: boolean = false;

    /** Overlay configuration for positioning the dialog */
    @Input() config = new OverlayState();

    /** @internal */
    private overlayRef: OverlayRef = null;

    ngAfterContentInit(): any {
        //if ( this.actions ) {
        //    this.actions.dialog = this;
        //}
    }

    ngOnDestroy(): any {
        return this.close();
    }

    /** Show the dialog */
    show(): Promise<Md2Dialog> {
        return this.close()
            .then(() => this.overlay.create( this.config ) )
            .then(( ref: OverlayRef ) => {
                this.overlayRef = ref;
                return ref.attach( this.portal );
            })
            .then(() => Animate.wait() )
            .then(() => {
                this.active = true;
                this.onShow.emit( this );
                return this;
            });
    }

    /** Close the dialog */
    close( result: any = true, cancel: boolean = false ): Promise<Md2Dialog> {
        if ( !this.overlayRef ) {
            return Promise.resolve<Md2Dialog>( this );
        }
        this.active = false;
        // TODO(jd): this is terrible, use animate states
        return Animate.wait( 100 )
            .then(() => this.overlayRef.detach() )
            .then(() => {
                this.overlayRef.dispose();
                this.overlayRef = null;
                if ( cancel ) {
                    this.onCancel.emit( result );
                }
                else {
                    this.onClose.emit( result );
                }
                return this;
            });
    }

    private onDocumentKeypress( event: KeyboardEvent ) {
        if ( event.keyCode == KeyCodes.ESCAPE ) {
            this.close();
        }
    }
}



//export * from './dialog-actions';
export * from './dialog-portal';
//export * from './dialog-title';
