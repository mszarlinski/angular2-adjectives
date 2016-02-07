import {Directive,  ElementRef, Input, Output, EventEmitter} from 'angular2/core';

declare var $:any;

@Directive({
    selector: '[select2]'
})
export class Select2 {

    @Input() private placeholder:string;
    @Output() selected = new EventEmitter<number>();
    @Output() deleted = new EventEmitter<number>();

    constructor(public el:ElementRef) {
    }

    ngOnInit() {
        let self = this;

        $(this.el.nativeElement).select2({
            placeholder: this.placeholder
        }).on('select2:select', function (event) {
            self.selected.emit(event.params.data.id);
        }).on('select2:unselect', function (event) {
            self.deleted.emit(event.params.data.id);
        });
    }
}

