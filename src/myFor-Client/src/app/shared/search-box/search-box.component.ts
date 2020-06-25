import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.sass']
})
export class SearchBoxComponent {
    focusing = false;
    @Output() enter = new EventEmitter<string>();

    constructor() {}

    search(value: string) {
        this.enter.emit(value);
    }

    /**
     * 点击了输入框
     */
    focus() {
        this.focusing = true;
    }
    /**
     * 失去焦点
     */
    restore() {
        this.focusing = false;
    }
}
