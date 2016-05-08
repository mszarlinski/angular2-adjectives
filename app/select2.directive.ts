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
            placeholder: this.placeholder,
            matcher: (chars, label, item) => Select2.matcher(chars, item.context)
        }).on('change', (event:any) => {
            if (event.added) {
                self.selected.emit(+event.added.id);
            } else if (event.removed) {
                self.deleted.emit(+event.removed.id);
            }
        });

        // ======== select2#4.0.0 version ========
        //    }).on('select2:select', function (event:any) {
        //    self.selected.emit(+event.params.data.id);
        //}).on('select2:unselect', function (event:any) {
        //    self.deleted.emit(+event.params.data.id);
        //});
    }

    static matcher(chars, itemContext):boolean {
        return chars && itemContext.label.indexOf(chars) != -1 || (itemContext.index + 1) == chars;
    }
}

