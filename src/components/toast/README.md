# md2-toast

Native Angular2 Material Toast service

## API

Example:
 
 ```ts

...

import {Md2Toast} from 'md2/toast';

@Component({
    selector: "...",
    providers: [Md2Toast]
})

export class ... {
    
    ...
    
    toastMe() {
      this.toast.show('Toast message...');

      ---  or  ---

      this.toast.show({ message: 'Toast message...', hideDelay: 1000 });
    }

    ...

}
 ```
