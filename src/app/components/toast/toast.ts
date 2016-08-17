import {Component} from '@angular/core';
import {Md2Toast} from '../../../components/toast/toast';

@Component({
  selector: 'toast',
  templateUrl: './app/components/toast/toast.html'
})
export class Toast {
  constructor(private toast: Md2Toast) { }
  toastMe() {
    this.toast.show('test message...');
  }
}
