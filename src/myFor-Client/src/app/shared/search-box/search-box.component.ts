import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.sass']
})
export class SearchBoxComponent implements OnInit {
    @Output() enter = new EventEmitter<string>();

    value = '';
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.value = this.route.snapshot.paramMap.get('s');
    }

    search() {
        this.value = this.value.trim();
        this.enter.emit(this.value);
        this.router.navigate(['/search', { s: this.value }]);
    }
}
