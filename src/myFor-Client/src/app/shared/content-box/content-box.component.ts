import { Component, Inject, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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
export class ContentBoxComponent implements AfterViewInit {

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
    @Input() set referenceFrom(value: string) {
        if (value) {
            this.reference.nativeElement.innerHTML = value;
        }
    }
    @Input() set thoughtFrom(value: string) {
        if (value) {
            this.thought.nativeElement.innerHTML = value;
        }
    }
    @Input() set data(value: string) {
        this.contentSegments = value.split('\n');
    }
    contentSegments: string[] = [];
    constructor(
        @Inject(DOCUMENT) private doc: any
    ) {}

    ngAfterViewInit(): void {
        //  暂时失去作用
        // const aTargets = this.doc.getElementsByName(`a-${this.code}`);
        // if (this.disabledATarget) {
        //     aTargets.forEach((e: any) => {
        //         e.href = 'javascript:;';
        //         e.style = 'text-decoration: none';
        //     });
        // }
    }
}
