import {Directive,  ElementRef, Output, EventEmitter} from 'angular2/core';

declare var $:any;

//TODO: limit selectable items after selection
@Directive({
    selector: '[select2]',
    properties: ['placeholder']
})
export class Select2 {

    private placeholder:string;
    @Output() selected = new EventEmitter<number>();
    @Output() deleted = new EventEmitter<number>();

    constructor(public el:ElementRef) {
    }

    ngOnInit() {
        let self = this;

        $(this.el.nativeElement).select2({
            placeholder: this.placeholder
        }).on('select2:select', function (event:any) {
            self.selected.emit(event.params.data.id);
        }).on('select2:unselect', function (event:any) {
            self.deleted.emit(event.params.data.id);
        });
    }
}

