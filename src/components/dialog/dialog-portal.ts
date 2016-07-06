import {Directive, ViewContainerRef, TemplateRef} from '@angular/core';
import {TemplatePortalDirective} from '../../core/core';

@Directive( { selector: '[mdDialogPortal]' })
export class Md2DialogPortal extends TemplatePortalDirective {
    constructor( templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef ) {
        super( templateRef, viewContainerRef );
    }
}
