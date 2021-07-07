import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchRequestWithGroupByAndInclude, ValueCompare } from '../../requests/search-request';
import { GeneralHelperService } from '../general-helper.service';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  searchRecord: Map<string, ValueCompare> = new Map;
  params = "patient,patient.department, confirmSignature, accountCreateBy, periodicInventory.month, periodicInventory.year,TreatmentInformations,DiseaseStatusInTreatments,isDelivered,createAt";

  constructor(
    private summaryService: SummaryService,
    private router: Router,
    private generalService: GeneralHelperService
  ) { }

  patientValueCompare: ValueCompare = {
    compare: "Equals",
    value: ""
  }

  treatmentSearchRequest = new SearchRequestWithGroupByAndInclude(10, 1, 'createAt', 0, this.searchRecord, this.params, null, null);

  getPatientTreatment(patientId: string) {
    this.generalService.setValueCompare(patientId, this.patientValueCompare, "patient.id", this.searchRecord);
    console.log('searchMap', this.searchRecord);
    this.treatmentSearchRequest.searchValue = this.searchRecord
    this.summaryService.searchTreatment(this.treatmentSearchRequest).subscribe(
      (response) => {
        this.router.navigate(['/patient-management/patient-treatment-list', patientId], {
          fragment: response.data.data
        });
        console.log(response.data);
      },
      (error) => {
        this.router.navigate(['/patient-management/patient-list']);
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    );
  }
}
