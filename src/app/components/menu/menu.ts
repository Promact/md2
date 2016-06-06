import {Component} from '@angular/core';

import {MENU_DIRECTIVES} from '../../../components/menu/menu';

@Component({
  selector: 'menu',
  templateUrl: './app/components/menu/menu.html',
  directives: [MENU_DIRECTIVES]
})
export class Menu { }
