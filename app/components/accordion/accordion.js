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
const accordion_1 = require('../../../components/accordion/accordion');
//import {CodePrettify} from '../../code.prettify';
let Accordion = class Accordion {
    constructor() {
        this.accordions = [
            { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
            { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
            { title: 'Dynamic Title 3', content: 'Dynamic content 3', active: true }
        ];
        this.multiple = false;
        setTimeout(() => {
            this.accordions.push({ title: 'Dynamic Title 4', content: 'Dynamic content 4', active: true });
        }, 5000);
    }
};
Accordion = __decorate([
    core_1.Component({
        selector: 'accordion',
        templateUrl: './app/components/accordion/accordion.html',
        directives: [accordion_1.ACCORDION_DIRECTIVES] //, CodePrettify
    }), 
    __metadata('design:paramtypes', [])
], Accordion);
exports.Accordion = Accordion;

//# sourceMappingURL=accordion.js.map
