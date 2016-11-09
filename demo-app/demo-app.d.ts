import { Location } from '@angular/common';
import { Router } from '@angular/router';
export declare class Home {
}
export declare class DemoApp {
    private location;
    private _router;
    private isSidenavOpened;
    private footerNav;
    navItems: {
        name: string;
        route: string;
    }[];
    constructor(location: Location, _router: Router);
    ngOnInit(): void;
    sidenavToggle(): void;
    sidenav(state: boolean): void;
    isActive(path: string): boolean;
    private readonly window;
}
