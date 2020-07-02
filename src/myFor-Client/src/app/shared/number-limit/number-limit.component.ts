import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-number-limit',
    template: `
<span class="number-list" [ngClass]="colorClass">
    <mat-progress-spinner [color]="colorClass" [diameter]="23" [strokeWidth]="3" mode="determinate" [value]="rate"></mat-progress-spinner>
    &nbsp;&nbsp;{{current}}/{{maxLength}}
</span>
    `,
    styleUrls: ['./number-limit.component.sass']
})
export class NumberLimitComponent {

    current = 0;
    @Input() maxLength = 0;
    @Input() set currentLength(value: number) {
        this.current = value;
        if (this.maxLength - this.current <= 20) {
            this.colorClass = 'warn';
        } else {
            this.colorClass = 'primary';
        }
        if (this.maxLength - this.current <= 0) {
            this.rate = 100;
        } else {
            this.rate = this.current / this.maxLength * 100;
        }
    }
    rate = 0;
    colorClass = 'primary';

    constructor() {}
}
