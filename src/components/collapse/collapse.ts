import { Directive} from '@angular/core';

@Directive({
  selector: '[collapse]',
  properties: ['collapse'],
  host: {
    '[class.in]': 'isExpanded',
    '[class.collapse]': 'true',
    '[class.collapsing]': 'isCollapsing',
    '[attr.aria-expanded]': 'isExpanded',
    '[attr.aria-hidden]': '!isExpanded',
  }
})

export class Md2Collapse {
  private height: string;
  private isExpanded: boolean = true;
  private isCollapsing: boolean = false;

  private get collapse(): boolean {
    return this.isExpanded;
  }

  private set collapse(value: boolean) {
    this.isExpanded = value;
    this.toggle();
  }

  toggle() {
    if (this.isExpanded) {
      this.hide();
    } else {
      this.show();
    }
  }

  hide() {
    this.isCollapsing = true;
    this.isExpanded = false;
    setTimeout(() => {
      this.isCollapsing = false;
    }, 4);
  }

  show() {
    this.isCollapsing = true;
    this.isExpanded = true;
    setTimeout(() => {
      this.isCollapsing = false;
    }, 4);
  }
}

//import {Directive, OnChanges, ElementRef, Input} from '@angular/core';
//import {AnimationBuilder} from '@angular/src/animate/animation_builder';
//import {CssAnimationBuilder} from '@angular/src/animate/css_animation_builder';

//@Directive({
//  selector: '[collapse]',
//  host: {
//    '[attr.aria-expanded]': '!collapse',
//    '[attr.aria-hidden]': 'collapse'
//  }
//})
//export class Md2Collapse implements OnChanges {

//  @Input() duration: number = 500;

//  @Input() collapse: boolean;

//  private _animation: CssAnimationBuilder;

//  constructor(animationBuilder: AnimationBuilder, private _element: ElementRef) {
//    this._animation = animationBuilder.css();
//  }

//  ngOnChanges(changes) {
//    if (changes.collapse) {
//      if (this.collapse) {
//        this.hide()
//      } else {
//        this.show();
//      }
//    }
//  }

//  hide(): void {
//    this._baseSequence
//      .setFromStyles({
//        height: this._element.nativeElement.scrollHeight + 'px',
//        overflow: 'hidden'
//      })
//      .setToStyles({
//        height: '0',
//        paddingTop: '0',
//        paddingBottom: '0'
//      });

//    let a = this._animation.start(this._element.nativeElement);
//    a.onComplete(() => {
//      a.removeClasses(['in']); // rapid change will leave in
//      a.addClasses(['collapse']);
//    });
//  }

//  show(): void {
//    this._animation
//      .setDuration(0)
//      .addClass('in')
//      .setFromStyles({
//        overflow: 'hidden'
//      })
//      .setToStyles({
//        paddingTop: '',
//        paddingBottom: ''
//      })
//      .start(this._element.nativeElement)
//      .onComplete(() => {
//        let a = this._baseSequence
//          .setFromStyles({
//            height: '0'
//          })
//          .setToStyles({
//            height: this._element.nativeElement.scrollHeight + 'px'
//          })
//          .start(this._element.nativeElement);

//        a.onComplete(() => a.addClasses(['collapse', 'in']));
//      });
//  }

//  private get _elementHeight(): number {
//    let el = this._element.nativeElement;
//    var height = el.offsetHeight;
//    var style = getComputedStyle(el);

//    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
//    return height;
//  }

//  private get _baseSequence(): CssAnimationBuilder {
//    return this._animation
//      .setDuration(this.duration)
//      .removeClass('collapse')
//      .removeClass('in')
//      .addAnimationClass('collapsing')
//  }
//}