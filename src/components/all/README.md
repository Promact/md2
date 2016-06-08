## Inject All Components

TS sample code
 ```ts

...

import { MD2_ALL_DIRECTIVES } from 'md2/all';

@Component({
    selector: "...",
    directives: [MD2_ALL_DIRECTIVES]
})

export class ... {
    
    ...

}
 ```