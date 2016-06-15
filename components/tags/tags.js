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
const common_1 = require('@angular/common');
const autocomplete_pipe_1 = require('../autocomplete/autocomplete.pipe');
const noop = () => { };
let nextId = 0;
const MD2_TAGS_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(() => Md2Tags),
    multi: true
});
let Md2Tags = class Md2Tags {
    constructor(element) {
        this.element = element;
        this.change = new core_1.EventEmitter();
        this._value = '';
        this._isInitialized = false;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._tags = [];
        this.list = [];
        this.items = [];
        this.focusedTag = 0;
        this.selectedTag = -1;
        this.tagBuffer = '';
        this.inputFocused = false;
        this.noBlur = true;
        this.id = 'md2-tags-' + (++nextId);
        this.disabled = false;
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
        this.selectAndFocusTagSafe = function (index) {
            if (!this.items.length) {
                this.selectTag(-1);
                this.onFocus();
                return;
            }
            if (index === this.items.length)
                return this.onFocus();
            index = Math.max(index, 0);
            index = Math.min(index, this.items.length - 1);
            this.selectTag(index);
        };
    }
    ngAfterContentInit() {
        this._isInitialized = true;
    }
    set tags(value) {
        this._tags = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this.setValue(value);
    }
    setValue(value) {
        if (value !== this._value) {
            this._value = value;
            this.items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                this.items = this.value.map((tag) => new Tag(tag, this.textKey, this.valueKey));
            }
            if (this._isInitialized) {
                this._onChangeCallback(value);
                this.change.emit(this._value);
            }
        }
    }
    get isMenuVisible() {
        return ((this.inputFocused || this.noBlur) && this.tagBuffer && this.list && this.list.length) ? true : false;
    }
    updateScroll() {
        if (this.focusedTag < 0)
            return;
        let menuContainer = this.element.nativeElement.querySelector('.md2-tags-menu');
        if (!menuContainer)
            return;
        let choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1)
            return;
        let highlighted = choices[this.focusedTag];
        if (!highlighted)
            return;
        let top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        let height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    }
    inputKeydown(event) {
        //Backspace
        if (event.keyCode === 8 && !this.tagBuffer) {
            event.preventDefault();
            event.stopPropagation();
            if (this.items.length && this.selectedTag < 0) {
                this.selectAndFocusTagSafe(this.items.length - 1);
            }
            else if (this.items.length) {
                this.removeAndSelectAdjacentTag(this.selectedTag);
            }
            return;
        }
        // Left / Right Arrow
        if ((event.keyCode === 37 || event.keyCode === 39) && !this.tagBuffer) {
            return;
        }
        // Down Arrow
        if (event.keyCode === 40) {
            if (!this.isMenuVisible)
                return;
            event.stopPropagation();
            event.preventDefault();
            this.focusedTag = (this.focusedTag === this.list.length - 1) ? 0 : Math.min(this.focusedTag + 1, this.list.length - 1);
            this.updateScroll();
            return;
        }
        // Up Arrow
        if (event.keyCode === 38) {
            if (!this.isMenuVisible)
                return;
            event.stopPropagation();
            event.preventDefault();
            this.focusedTag = (this.focusedTag === 0) ? this.list.length - 1 : Math.max(0, this.focusedTag - 1);
            this.updateScroll();
            return;
        }
        // Tab Key
        if (event.keyCode === 9) {
            return;
        }
        // Enter / Space
        if (event.keyCode === 13 || event.keyCode === 32) {
            if (!this.tagBuffer)
                return;
            event.preventDefault();
            this.addTag(event, this.focusedTag);
            return;
        }
        // Escape Key
        if (event.keyCode === 27) {
            event.stopPropagation();
            event.preventDefault();
            if (this.tagBuffer)
                this.tagBuffer = '';
            if (this.selectedTag >= 0)
                this.onFocus();
            return;
        }
        //reset selected tag
        if (this.selectedTag >= 0)
            this.resetselectedTag();
        //filter
        setTimeout(() => {
            this.filterMatches(new RegExp(this.tagBuffer, 'ig'));
        }, 10);
    }
    onKeydown(event) {
        if (this.tagBuffer || this.disabled)
            return;
        else if (event.keyCode === 8 || event.keyCode === 46) {
            if (this.selectedTag < 0)
                return;
            event.preventDefault();
            this.removeAndSelectAdjacentTag(this.selectedTag);
        }
        else if (event.keyCode === 37) {
            event.preventDefault();
            if (this.selectedTag < 0)
                this.selectedTag = this.items.length;
            if (this.items.length)
                this.selectAndFocusTagSafe(this.selectedTag - 1);
        }
        else if (event.keyCode === 39) {
            event.preventDefault();
            if (this.selectedTag >= this.items.length)
                this.selectedTag = -1;
            this.selectAndFocusTagSafe(this.selectedTag + 1);
        }
        else if (event.keyCode === 27 || event.keyCode === 9) {
            if (this.selectedTag < 0)
                return;
            event.preventDefault();
            this.onFocus();
        }
    }
    removeAndSelectAdjacentTag(index) {
        var selIndex = this.getAdjacentTagIndex(index);
        this.removeTag(index);
        this.selectAndFocusTagSafe(selIndex);
    }
    resetselectedTag() {
        this.selectedTag = -1;
    }
    getAdjacentTagIndex(index) {
        var len = this.items.length - 1;
        return (len == 0) ? -1 :
            (index == len) ? index - 1 : index;
    }
    addTag(event, index) {
        event.preventDefault();
        event.stopPropagation();
        this.items.push(this.list[index]);
        this.tagBuffer = '';
        this.updateValue();
    }
    removeTagAndFocusInput(index) {
        this.removeTag(index);
        this.onFocus();
    }
    removeTag(index) {
        this.items.splice(index, 1);
        this.updateValue();
    }
    updateValue() {
        this._value = new Array();
        for (let i = 0; i < this.items.length; i++) {
            this._value.push(this.items[i].value);
        }
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
    }
    selectTag(index) {
        if (index >= -1 && index <= this.items.length) {
            this.selectedTag = index;
        }
    }
    onFocus() {
        this.element.nativeElement.querySelector('input').focus();
        this.resetselectedTag();
    }
    onInputFocus() {
        this.inputFocused = true;
        this.resetselectedTag();
    }
    onInputBlur() {
        this.inputFocused = false;
    }
    listEnter() { this.noBlur = true; }
    listLeave() { this.noBlur = false; }
    filterMatches(query) {
        let tempList = this._tags.map((tag) => new Tag(tag, this.textKey, this.valueKey));
        this.list = tempList.filter((t) => (query.test(t.text) && !this.items.find((i) => t.text === i.text)));
        if (this.list.length > 0) {
            this.focusedTag = 0;
        }
    }
    writeValue(value) {
        this.setValue(value);
    }
    registerOnChange(fn) { this._onChangeCallback = fn; }
    registerOnTouched(fn) { this._onTouchedCallback = fn; }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], Md2Tags.prototype, "change", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Md2Tags.prototype, "id", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2Tags.prototype, "disabled", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], Md2Tags.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Md2Tags.prototype, "placeholder", void 0);
__decorate([
    core_1.Input('md-tag-text'), 
    __metadata('design:type', String)
], Md2Tags.prototype, "textKey", void 0);
__decorate([
    core_1.Input('md-tag-value'), 
    __metadata('design:type', String)
], Md2Tags.prototype, "valueKey", void 0);
__decorate([
    core_1.Input('md-tags'), 
    __metadata('design:type', Array), 
    __metadata('design:paramtypes', [Array])
], Md2Tags.prototype, "tags", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], Md2Tags.prototype, "value", null);
__decorate([
    core_1.HostListener('keydown', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [KeyboardEvent]), 
    __metadata('design:returntype', void 0)
], Md2Tags.prototype, "onKeydown", null);
__decorate([
    core_1.HostListener('focus'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], Md2Tags.prototype, "onFocus", null);
Md2Tags = __decorate([
    core_1.Component({
        selector: 'md2-tags',
        pipes: [autocomplete_pipe_1.HightlightPipe],
        template: `
    <div class="md2-tags-container">
      <span *ngFor="let t of items; let i = index;" class="md2-tag" [class.active]="selectedTag === i" (click)="selectTag(i)">
        <span class="md2-tag-text">{{t.text}}</span>
        <span class="md2-remove-icon" (click)="removeTagAndFocusInput(i)"></span>
      </span>
      <span class="md2-tag-add">
        <input [(ngModel)]="tagBuffer" type="text" tabs="false" autocomplete="off" tabindex="-1" [disabled]="disabled" class="md2-tags-input" [placeholder]="placeholder" (focus)="onInputFocus()" (blur)="onInputBlur()" (keydown)="inputKeydown($event)" (change)="$event.stopPropagation()" />
        <ul *ngIf="isMenuVisible" class="md2-tags-menu" (mouseenter)="listEnter()" (mouseleave)="listLeave()">
          <li class="md2-option" *ngFor="let l of list; let i = index;" [class.focused]="focusedTag === i" (click)="addTag($event, i)">
            <span class="md2-option-text" [innerHtml]="l.text | hightlight:tagBuffer"></span>
          </li>
        </ul>
      </span>
    </div>
  `,
        styles: [`
    .md2-tags { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    .md2-tags:focus { outline: none; }
    .md2-tags .md2-tags-container { position: relative; display: block; max-width: 100%; padding: 2px 3px 8px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; cursor: text; }
    .md2-tags .md2-tags-container:before, .md2-tags .md2-tags-container:after { display: table; content: " "; }
    .md2-tags .md2-tags-container:after { clear: both; }
    .md2-tags.focus .md2-tags-container { padding-bottom: 7px; border-bottom: 2px solid #106cc8; }
    .md2-tags.md2-tags-disabled .md2-tags-container { color: rgba(0,0,0,0.38); cursor: default; }
    .md2-tags.md2-tags-disabled.focus .md2-tags-container { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }
    .md2-tags .md2-tags-container .md2-tag { position: relative; cursor: default; border-radius: 16px; display: block; height: 32px; line-height: 32px; margin: 8px 8px 0 0; padding: 0 26px 0 12px; float: left; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; max-width: 100%; background: rgb(224,224,224); color: rgb(66,66,66); white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; }
    .md2-tags .md2-tags-container .md2-tag.active { background: #106cc8; color: rgba(255,255,255,0.87); }
    .md2-tags .md2-tags-container .md2-tag .md2-remove-icon { position: absolute; top: 8px; right: 1px; cursor: pointer; display: inline-block; width: 16px; height: 16px; margin: 0 4px; overflow: hidden; }
    .md2-tags .md2-tag .md2-remove-icon::before,
    .md2-tags .md2-tag .md2-remove-icon::after { content: ''; position: absolute; height: 2px; width: 100%; top: 50%; left: 0; margin-top: -1px; background: #888; border-radius: 2px; }
    .md2-tags .md2-tag.active .md2-remove-icon::before,
    .md2-tags .md2-tag.active .md2-remove-icon::after { background: rgba(255,255,255,0.87); }
    .md2-tags .md2-tag .md2-remove-icon::before { -webkit-transform: rotate(45deg); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg); transform: rotate(45deg); }
    .md2-tags .md2-tag .md2-remove-icon::after { -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); transform: rotate(-45deg); }
    .md2-tags .md2-tag-add { position: relative; display: inline-block; }
    .md2-tags input { border: 0; outline: 0; margin-top: 8px; height: 32px; line-height: 32px; padding: 0; color: rgba(0,0,0,0.87); background: 0 0; }
    .md2-tags .md2-tags-container .md2-tags-placeholder { color: rgba(0, 0, 0, 0.38); }
    .md2-tags .md2-tags-menu { position: absolute; left: 0; top: 100%; display: block; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 6px 0 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
    .md2-tags .md2-tags-menu .md2-option { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }
    .md2-tags .md2-tags-menu .md2-option:hover, .md2-tags .md2-tags-menu .md2-option.focused { background: #eeeeee; }
    .md2-tags .md2-tags-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }
    .md2-tags .highlight { color: #757575; }
  `],
        host: {
            'role': 'tags',
            '[id]': 'id',
            '[class.md2-tags]': 'true',
            '[class.focus]': 'inputFocused || selectedTag >= 0',
            '[class.md2-tags-disabled]': 'disabled',
            '[tabindex]': 'disabled ? -1 : tabindex',
            '[attr.aria-disabled]': 'disabled'
        },
        providers: [MD2_TAGS_CONTROL_VALUE_ACCESSOR],
        encapsulation: core_1.ViewEncapsulation.None
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], Md2Tags);
exports.Md2Tags = Md2Tags;
class Tag {
    constructor(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
}
exports.Tag = Tag;

//# sourceMappingURL=tags.js.map
