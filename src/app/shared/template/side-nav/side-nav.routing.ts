import { SideNavInterface } from "../../interfaces/side-nav.type";

export const ROUTES: SideNavInterface[] = [
    {
        path: '',
        title: 'Dashborad',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'dashboard',
        submenu: [
            {
                path: '/dashboard/magage-medicine',
                title: 'Manage Medicines',
                iconType: '',
                iconTheme: '',
                icon: '',
                submenu: [],
            }
        ]
    },
    {
        path: '/manage-symtoms/',
        title: 'Manage Symptoms',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'group',
        submenu: [],
    }


]
