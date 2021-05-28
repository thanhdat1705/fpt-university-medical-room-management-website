import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [

    {
        path: 'authentication',
        loadChildren: () => import('../../authentication/authentication.module').then(m => m.AuthenticationModule)
    },


];