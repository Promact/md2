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
const autocomplete_1 = require('../../../components/autocomplete/autocomplete');
let Autocomplete = class Autocomplete {
    constructor() {
        this.disabled = false;
        this.items = [
            { name: 'Amsterdam', value: '1' },
            { name: 'Birmingham', value: '2' },
            { name: 'Dortmund', value: '3' },
            { name: 'Gothenburg', value: '4' },
            { name: 'London', value: '5' },
            { name: 'Seville', value: '6' }
        ];
        this.item = [];
    }
    change(value) {
        console.log('Changed data: ', value);
    }
};
Autocomplete = __decorate([
    core_1.Component({
        selector: 'autocomplete',
        templateUrl: './app/components/autocomplete/autocomplete.html',
        directives: [autocomplete_1.Md2Autocomplete]
    }), 
    __metadata('design:paramtypes', [])
], Autocomplete);
exports.Autocomplete = Autocomplete;

//# sourceMappingURL=autocomplete.js.map
