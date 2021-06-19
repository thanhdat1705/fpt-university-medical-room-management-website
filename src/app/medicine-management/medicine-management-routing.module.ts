import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineClassificationListComponent } from './medicine-classification-list/medicine-classification-list.component';
import { AddMedicineComponent } from './medicine-list/add-medicine/add-medicine.component';
import { DetailsMedicineComponent } from './medicine-list/details-medicine/details-medicine.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineSubgroupListComponent } from './medicine-subgroup-list/medicine-subgroup-list.component';
import { MedicineUnitListComponent } from './medicine-unit-list/medicine-unit-list.component';

const routes: Routes = [
  {
    path: 'medicine-list',
    component: MedicineListComponent,
    data: {
      title: 'Danh sách dược phẩm'
    },
  },
  {
    path: 'medicine-list/add-medicine',
    component: AddMedicineComponent,
    data: {
      title: 'Thêm dược phẩm',

    }
  },
  {
    path: 'medicine-list/details-medicine',
    component: DetailsMedicineComponent,
    data: {
      title: 'Chi tiết dược phẩm',

    }
  },
  {
    path: 'medicine-unit-list',
    component: MedicineUnitListComponent,
    data: {
      title: 'Danh sách đơn vị'
    },
  },
  {
    path: 'medicine-subgroup-list',
    component: MedicineSubgroupListComponent,
    data: {
      title: 'Danh sách nhóm'
    },
  },
  {
    path: 'medicine-classification-list',
    component: MedicineClassificationListComponent,
    data: {
      title: 'Danh sách loại'
    },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineManagementRoutingModule { }
