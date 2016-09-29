import { Location } from '@angular/common';
export declare class Home {
}
export declare class DemoApp {
    private location;
    private isSidenavOpened;
    constructor(location: Location);
    ngOnInit(): void;
    sidenavToggle(): void;
    sidenav(state: boolean): void;
    isActive(path: string): boolean;
    private readonly window;
}
