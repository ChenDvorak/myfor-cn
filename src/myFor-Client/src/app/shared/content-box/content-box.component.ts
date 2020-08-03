import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
    selector: 'app-content-box',
    template:
    `
<div>
    <span class="reference" #reference></span>
    <span class="thought" #thought></span>
</div>
<div class="box">
    <p *ngFor="let segment of contentSegments" class="content-section">{{segment}}</p>
</div>
    `,
    styleUrls: ['./content-box.component.sass']
})
export class ContentBoxComponent {

    @ViewChild('reference', {static: true}) reference: ElementRef;
    @ViewChild('thought', {static: true}) thought: ElementRef;
    /**
     * 博文的编码
     */
    @Input() code = '';
    /**
     * 是否使 a 标签不能点击
     */
    @Input() disabledATarget = false;
    @Input() set referenceFrom(value: KeyValue<string, string>) {
        if (value) {
            this.reference.nativeElement.innerHTML = this.setReferenceHTML(value.key, value.value);
        }
    }
    @Input() set thoughtFrom(value: KeyValue<string, string>) {
        if (value) {
            this.thought.nativeElement.innerHTML = this.setThoughtHTML(value.key, value.value);
        }
    }
    @Input() set data(value: string) {
        this.contentSegments = value.split('\n');
    }
    contentSegments: string[] = [];
    constructor(
    ) {}

    private setReferenceHTML(code: string, title: string): string {
        if (!code) {
            return '';
        }
        return `引用<a target='_blank' href='/b/${escape(code)}'>@${title}</a><br>`;
    }
    private setThoughtHTML(code: string, title: string): string {
        if (!code) {
            return '';
        }
        return `对<a target='_blank' href='/b/${escape(code)}'>《${title}》</a>的见解<br>`;
    }
}
