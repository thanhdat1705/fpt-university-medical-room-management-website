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
                loadChildren: () => import('../../medicine-management/medicine-management.module').then(m => m.MedicineManagementModule)
            },
        ]

    },
    {
        path: 'account',
        data: {
            title: 'Quản lý tài khoản'
        },
        children: [
            {
                path: '',
                redirectTo: '/medicine-management',
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
                loadChildren: () => import('../../batch-medicine-management/batch-medicine-management.module').then(m => m.BatchMedicineManagementModule)
            }
        ],

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
                loadChildren: () => import('../../request-buy-medicine/request-buy-medicine.module').then(m => m.RequestBuyMedicineModule) 
            }
        ],
        
    },
];