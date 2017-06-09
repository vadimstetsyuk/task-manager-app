import { Component } from '@angular/core';

@Component({
    selector: 'tab-menu',
    templateUrl: './tab-menu.component.html',
    styleUrls: ['./tab-menu.component.css']
})

export class TabMenuComponent {
    routeLinks: any[];
    activeLinkIndex = 0;

    constructor() {
        this.routeLinks = [
            { label: 'Calendar', link: 'calendar' },
            { label: 'Tasks', link: 'tasks' }];
    }
}