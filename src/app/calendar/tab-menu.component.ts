import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'tab-menu',
    templateUrl: './tab-menu.component.html',
    styleUrls: ['./tab-menu.component.css']
})

export class TabMenuComponent {
    routeLinks: any[];
    activeLinkIndex: number;

    constructor(private _router: Router) {
        this.routeLinks = [
            { label: 'Calendar', link: '' },
            { label: 'Tasks', link: 'tasks' }];
        this.activeLinkIndex = 0;
    }
}