# md2-tooltip

Native Angular2 Material Tooltip directive

## API

Example:
 
 ```html
<span tooltip-direction="left" tooltip="On the Left!">Left</span> <br />
<span tooltip-direction="right" tooltip="On the Right!">Right</span> <br />
<span tooltip-direction="bottom" tooltip="On the Bottom!">Bottom</span> <br />
<span tooltip-direction="top" tooltip="On the Top!">Top</span> <br />
<span tooltip-delay='1000' tooltip='appears with delay'>Delayed 1 Second</span>
 ```
 ```ts

...

import {TOOLTIP_DIRECTIVES} from 'md2/tooltip';

@Component({
    selector: "...",
    directives: [TOOLTIP_DIRECTIVES]
})

export class ... {
    
    ...

}
 ```

### Properties

  - `tooltip` (`string`) - text of tooltip.
  - `tooltip-direction` (`?string='bottom'`) - tooltip direction instruction, supported positions: 'top', 'bottom', 'left', 'right'.
  - `tooltip-delay` (`?numer=0`) - time in milliseconds before tooltip occurs.
