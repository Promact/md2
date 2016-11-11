import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'md-chips-demo',
    templateUrl: 'chips-demo.html'
})
export class ChipsDemo {
    private item: Array<any>;
    private itemsData: Array<any> = [
        { name: 'Vadodara', value: '1' },
        { name: 'Mumbai', value: '5' },
        { name: 'Goa', value: '6' }
    ];
    private items: Array<any> = [
        { text: 'Vadodaraa', value: '8' },
        { text: 'Mumbaia', value: '2' },
        { text: 'Goaa', value: '4' }
    ];
    
    private validPattern = /^[0-9]*$/;
    private change(value: any) {
        console.log('Changed data: ', value);
    }
}
