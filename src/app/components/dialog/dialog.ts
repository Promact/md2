import {Component} from '@angular/core';
import {Md2Dialog} from '../../../components/dialog/dialog';
import {OVERLAY_PROVIDERS} from '../../../core/overlay/overlay';

@Component( {
    selector: 'dialog-demo',
    templateUrl: './app/components/dialog/dialog.html',
    directives: [Md2Dialog],
    providers: [OVERLAY_PROVIDERS]
})
export class DialogComponent {
    private dialogHeader: string = 'Lorum Ipsum';

    private launchDialog( dialog: any ) {
        dialog.show();
    }

    private show( dialog: any ) {
        dialog.show();
    }

    private showAlert( event: Event ) { }
    private showConfirm( event: Event ) { }
    private showPrompt( event: Event ) { }
    private showAdvanced( event: Event ) { }
    private showTabDialog( event: Event ) { }
}
