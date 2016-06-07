"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
let Md2Tab = class Md2Tab {
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Md2Tab.prototype, "header", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2Tab.prototype, "active", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2Tab.prototype, "disabled", void 0);
__decorate([
    core_1.Input('header-class'), 
    __metadata('design:type', String)
], Md2Tab.prototype, "headerClass", void 0);
Md2Tab = __decorate([
    core_1.Component({
        selector: 'md2-tab',
        template: `
    <div class="md2-tab-content" [style.display]="active ? 'block' : 'none'">
      <ng-content></ng-content>
    </div>
  `
    }), 
    __metadata('design:paramtypes', [])
], Md2Tab);
exports.Md2Tab = Md2Tab;

//# sourceMappingURL=tab.js.map
