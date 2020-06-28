import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
<footer>
    <span>@{{year}}</span>
    <span>All Right Reserved</span>
</footer>
    `,
    styleUrls: ['./footer.component.sass']
})
export class FooterComponent {

    year = new Date().getFullYear();
    constructor() {}

}
