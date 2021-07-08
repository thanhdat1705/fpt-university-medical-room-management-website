import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchRequestWithGroupByAndInclude, ValueCompare } from 'src/app/shared/requests/search-request';
import { TreatmentResponse } from 'src/app/shared/responses/treatment/treatment-details-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-patient-treatment-details',
  templateUrl: './patient-treatment-details.component.html',
  styleUrls: ['./patient-treatment-details.component.scss']
})
export class PatientTreatmentDetailsComponent implements OnInit {
  treatment: TreatmentResponse;

  pageSize = 10;
  total;
  pageIndex = 1;
  sortField = '';
  sortOrder = 0;
  searchRecordMap: Map<string, ValueCompare> = new Map;
  params = "patient,patient.department, confirmSignature, accountCreateBy, periodicInventory.month, periodicInventory.year,TreatmentInformations,DiseaseStatusInTreatments,isDelivered,createAt";
  id: string;
  deseaseStatusNames = '';
  selectFields = "id,confirmSignature,createAt,accountCreateBy,isDelivered,patient,patient.department, TreatmentInformations, DiseaseStatusInTreatments";
  createDate: string;


  constructor(
    private summaryService: SummaryService,
    private generalService: GeneralHelperService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id');

    this.getPatientTreatmentDetails(this.id, this.params);
  }



  getPatientTreatmentDetails(id: any, param: any) {
    this.summaryService.getTreatmentDetails(id, param).subscribe(
      (response) => {
        this.treatment = response.data;
        console.log(this.treatment);
        for(let i =0; i< this.treatment.diseaseStatusInTreatments.length; i++){
          if(i == this.treatment.diseaseStatusInTreatments.length-1){
            this.deseaseStatusNames += this.treatment.diseaseStatusInTreatments[i].diseaseStatus.name;
          }else{
          this.deseaseStatusNames += this.treatment.diseaseStatusInTreatments[i].diseaseStatus.name + ', ';
          }
        }
        this.createDate = this.generalService.getDate(this.treatment.createAt);
      }, (error) => {
        console.log(error);
        this.generalService.createErrorNotification(error);

      }
    )
  }

}
