import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
    {
        path: 'account',
        children: [{
            path: '',
            loadChildren: () => import('../../account/account.module').then(m => m.AccountModule),
        }]
    },

];