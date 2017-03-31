var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Directive } from '@angular/core';
/**
 * Fixed header that will be rendered above a select's options.
 */
var Md2SelectHeader = (function () {
    function Md2SelectHeader() {
    }
    return Md2SelectHeader;
}());
Md2SelectHeader = __decorate([
    Directive({
        selector: 'md2-select-header',
        host: {
            'class': 'md2-select-header',
        }
    })
], Md2SelectHeader);
export { Md2SelectHeader };
//# sourceMappingURL=select-header.js.map