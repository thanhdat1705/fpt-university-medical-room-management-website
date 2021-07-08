import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPatientListComponent } from './view-patient-list/view-patient-list.component';

const routes: Routes = [
  {
    path: 'patient-list',
    component: ViewPatientListComponent,
    data: {
      title: "Danh sách bệnh nhân"
    },

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientManagementRoutingModule { }
