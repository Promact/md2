var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, } from '@angular/core';
var Md2MenuItem = (function () {
    function Md2MenuItem() {
    }
    return Md2MenuItem;
}());
Md2MenuItem = __decorate([
    Component({selector: '[md2-menu-item]',
        host: {
            'role': 'menuitem'
        },
        template: '<ng-content></ng-content>'
    })
], Md2MenuItem);
export { Md2MenuItem };
//# sourceMappingURL=menu-item.js.map