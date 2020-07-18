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
<div #dataBox class="box"></div>
    `,
    styleUrls: ['./content-box.component.sass']
})
export class ContentBoxComponent implements AfterViewInit {

    @ViewChild('dataBox', {static: true}) dataBox: ElementRef;
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
        value = value.replace('\r\n', '<br>')
                     .replace('\r', '<br>')
                     .replace('\n', '<br>');
        value = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + value;

        this.dataBox.nativeElement.innerHTML = value;
    }
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
