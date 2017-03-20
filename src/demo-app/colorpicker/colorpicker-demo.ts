import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'colorpicker-demo',
    templateUrl: 'colorpicker-demo.html'
})
export class ColorpickerDemo {
    _color: string = null;
    isRequired = false;
    isDisabled = false;
    container: string = 'inline';
    containers: Array<any> = [
        { text: 'Inline', value: 'inline' },
        { text: 'Dialog', value: 'dialog' }];
    handleChange(value: any) {
        console.log('Changed color: ', value);
    }
}
