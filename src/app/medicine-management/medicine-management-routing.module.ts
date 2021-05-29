import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMedicineComponent } from './medicine-list/add-medicine/add-medicine.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';

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
      title: 'Add Medicine'
    }
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineManagementRoutingModule { }
