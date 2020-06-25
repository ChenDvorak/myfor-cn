import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.sass']
})
export class SearchBoxComponent {
    @Output() enter = new EventEmitter<string>();

    constructor() {}

    search(value: string) {
        this.enter.emit(value);
    }
}
