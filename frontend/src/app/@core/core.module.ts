import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { UserData } from './data/users';
import { MockDataModule } from './mock/mock-data.module';
import { UserService } from './mock/users.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { LayoutService, PlayerService, StateService } from './utils';

const DATA_SERVICES = [
    { provide: UserData, useClass: UserService }
];

export const NB_CORE_PROVIDERS = [
    ...MockDataModule.forRoot().providers,
    ...DATA_SERVICES,
    LayoutService,
    PlayerService,
    StateService
];

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [],
    declarations: []
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                ...NB_CORE_PROVIDERS
            ]
        };
    }
}
