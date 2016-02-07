import {Directive,  ElementRef, Input} from 'angular2/core';

declare var $:any;

@Directive({
    selector: '[select2]'
})
export class Select2 {

    @Input() private placeholder:string;

    constructor(public el:ElementRef) {
    }

    ngOnInit() {
        $(this.el.nativeElement).select2({
            placeholder: this.placeholder
        });
    }

}
