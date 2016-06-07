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
let CodePrettify = class CodePrettify {
    constructor(element) {
        this.element = element;
    }
    ngOnInit() {
        console.log(this.element);
        this.code = this.element.nativeElement.innerHTML;
    }
    //ngAfterContentInit
    ngAfterViewInit() {
        console.log(this.element);
    }
};
CodePrettify = __decorate([
    core_1.Component({
        selector: 'code-prettify',
        template: `{{code}}`
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], CodePrettify);
exports.CodePrettify = CodePrettify;

//# sourceMappingURL=code.prettify.js.map
