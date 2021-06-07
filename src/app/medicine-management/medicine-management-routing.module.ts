import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineClassificationListComponent } from './medicine-classification-list/medicine-classification-list.component';
import { AddMedicineComponent } from './medicine-list/add-medicine/add-medicine.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineSubgroupListComponent } from './medicine-subgroup-list/medicine-subgroup-list.component';
import { MedicineUnitListComponent } from './medicine-unit-list/medicine-unit-list.component';

const routes: Routes = [
  {
    path: 'medicine-list',
    component: MedicineListComponent,
    data: {
      title: 'Medicine List'
    },
  },
  {
    path: 'medicine-list/add-medicine',
    component: AddMedicineComponent,
    data: {
      title: 'Add Medicine',
     
    }
  },
  {
    path: 'medicine-unit-list',
    component: MedicineUnitListComponent,
    data: {
      title: 'Medicine Unit List'
    },
  }, {
    path: 'medicine-subgroup-list',
    component: MedicineSubgroupListComponent,
    data: {
      title: 'Medicine Subgroup List'
    },
  }, {
    path: 'medicine-classification-list',
    component: MedicineClassificationListComponent,
    data: {
      title: 'Medicine Classification List'
    },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineManagementRoutingModule { }
