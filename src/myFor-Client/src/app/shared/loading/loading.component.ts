import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    template: `
<div class="loading" *ngIf="loading">
    <mat-spinner [diameter]="30"></mat-spinner>
</div>
    `,
    styleUrls: ['./loading.component.sass']
})
export class LoadingComponent {
    @Input()loading = true;
    constructor() {}
}
