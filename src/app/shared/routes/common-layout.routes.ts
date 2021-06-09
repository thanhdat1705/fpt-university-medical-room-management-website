import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
    {
        path: 'medicine-management',
        data: {
            title: 'Medical Management'
        },
        children: [
            {
                path: '',
                redirectTo: '/test',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../medicine-management/medicine-management.module').then(m => m.MedicineManagementModule)
            },
        ]

    },
    {
        path: 'account',
        data: {
            title: 'Account Management'
        },
        children: [
            {
                path: '',
                redirectTo: '/test',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../account/account.module').then(m => m.AccountModule)
            },
        ]
    },

    {
        path: 'batch-medicine-management',
        data: {
            title: 'Batch Medicine Management'
        },
        children: [
            {
                path: '',
                redirectTo: '/test',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../batch-medicine-management/batch-medicine-management.module').then(m => m.BatchMedicineManagementModule)
            }
        ],

    },
];