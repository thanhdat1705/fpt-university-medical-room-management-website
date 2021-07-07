import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPatientListComponent } from './view-patient-list/view-patient-list.component';
import { ViewPatientTreatmentListComponent } from './view-patient-list/view-patient-treatment-list/view-patient-treatment-list.component';

const routes: Routes = [
  {
    path: 'patient-list',
    component: ViewPatientListComponent,
    data: {
      title: "Danh sách bệnh nhân"
    },

  },
  {
    //admin
    path: 'patient-treatment-list/:id',
    component: ViewPatientTreatmentListComponent,
    data: {
      title: "Lịch sử khám"
    },

  },{
    path: 'patient-treatment-history',
    component: ViewPatientTreatmentListComponent,
    data: {
      title: "Lịch sử khám"
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientManagementRoutingModule { }
