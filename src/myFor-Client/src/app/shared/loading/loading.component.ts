import { Component } from '@angular/core';

@Component({
    selector: 'app-loading',
    template: `
<div class="loading">
    <mat-spinner [diameter]="30"></mat-spinner>
</div>
    `,
    styleUrls: ['./loading.component.sass']
})
export class LoadingComponent {
    constructor() {}
}
