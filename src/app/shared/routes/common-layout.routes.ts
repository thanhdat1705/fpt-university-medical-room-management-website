import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
    {
        path: 'medicine-management',
        data: {
            title: 'Quản lý dược phẩm'
        },
        children: [
            {
                path: '',
                loadChildren: () => import('../../medicine-management/medicine-management.module').then(m => m.MedicineManagementModule)
            },
        ]

    },
    {
        path: 'account',
        data: {
            title: 'Quản lí tài khoản'
        },
        children: [
            {
                path: '',
                redirectTo: '/medicine-management',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../account-management/account.module').then(m => m.AccountModule)
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
                redirectTo: '/medicine-management',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../batch-medicine-management/batch-medicine-management.module').then(m => m.BatchMedicineManagementModule)
            }
        ],

    },

    {
        path: 'treatment-information-management',
        data: {
            title: 'Quản lí đơn điều trị'
        },
        children: [
            {
                path: '',
                redirectTo: '/medicine-management',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../treatment-information-management/treatment-information-management.module').then(m => m.TreatmentInformationManagementModule)
            }
        ],

    },
];