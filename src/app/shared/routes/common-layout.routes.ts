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
                redirectTo: '/medicine-management/medicine-list',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../pages/medicine-management/medicine-management.module').then(m => m.MedicineManagementModule)
            },
        ]

    },
    {
        path: 'account',
        data: {
            title: 'Quản lí tài khoản'
            // title: 'Quản lý tài khoản'
        },
        children: [
            {
                path: '',
                redirectTo: '/medicine-management',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../pages/account-management/account.module').then(m => m.AccountModule)
            },
        ]
    },

    {
        path: 'batch-medicine-management',
        data: {
            title: 'Quản lý lô'
        },
        children: [
            {
                path: '',
                redirectTo: '/batch-medicine-management/batch-medicine-list',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../pages/batch-medicine-management/batch-medicine-management.module').then(m => m.BatchMedicineManagementModule)
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
                loadChildren: () => import('../../pages/treatment-information-management/treatment-information-management.module').then(m => m.TreatmentInformationManagementModule)
            }
        ]
    },

    {
        path: 'request-buy-medicine',
        data: {
            title: 'Yêu cầu mua dược phẩm'
        },
        children: [
            // {
            //     path: '',
            //     redirectTo: '/request-buy-medicine/buy-medicine-list',
            //     pathMatch: 'full'
            // },
            {
                path: '',
                loadChildren: () => import('../../pages/request-buy-medicine/request-buy-medicine.module').then(m => m.RequestBuyMedicineModule)
            }
        ],

    },

    {
        path: 'periodic-inventory',
        data: {
            title: 'Xuất nhập tồn'
        },
        children: [
            {
                path: '',
                loadChildren: () => import('../../pages/periodic-inventory/periodic-inventory.module').then(m => m.PeriodicInventoryModule)
            }
        ],
        
    },
];