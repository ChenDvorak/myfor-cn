import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.sass']
})
export class SearchBoxComponent {
    @Output() enter = new EventEmitter<string>();

    constructor(
        private router: Router
    ) {}

    search(value: string) {
        if (value && value.trim) {
            value = value.trim();
            this.router.navigate(['/search', { s: value }]);
            this.enter.emit(value);
        }
    }
}
