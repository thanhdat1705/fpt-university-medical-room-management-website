import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
    {
        path: 'test', loadChildren: () => import('../../test/test.module').then(m => m.TestModule)
    },
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

];