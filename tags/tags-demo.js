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
var core_1 = require('@angular/core');
var TagsDemo = (function () {
    function TagsDemo() {
        this.disabled = false;
        this.tags = [
            { name: 'Amsterdam', value: '1' },
            { name: 'Birmingham', value: '2' },
            { name: 'Dortmund', value: '3' },
            { name: 'Gothenburg', value: '4' },
            { name: 'London', value: '5' },
            { name: 'Seville', value: '6' }
        ];
        this.tag = [
            { name: 'Dortmund', value: '3' },
            { name: 'Gothenburg', value: '4' }
        ];
    }
    TagsDemo.prototype.change = function (value) {
        console.log('Changed data: ', value);
    };
    TagsDemo = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tags-demo',
            templateUrl: 'tags-demo.html'
        }), 
        __metadata('design:paramtypes', [])
    ], TagsDemo);
    return TagsDemo;
}());
exports.TagsDemo = TagsDemo;

//# sourceMappingURL=tags-demo.js.map
