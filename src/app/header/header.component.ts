import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {

    constructor(private _router: Router) {

    }

    openAddTaskDialog() {
        this._router.navigate(['add']);
    }
}