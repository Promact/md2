import {Component} from '@angular/core';
import {Md2Toast} from '../../../components/toast/toast';

@Component({
  selector: 'toast',
  templateUrl: './app/components/toast/toast.html',
  providers: [Md2Toast]
})
export class Toast {
  constructor(private toast: Md2Toast) { }
  toastMe() {
    this.toast.show('test message...');
    //this.toast.show({ message: 'test object message...', hideDelay: 1000 });
  }
}
