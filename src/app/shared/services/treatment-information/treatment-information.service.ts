import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TreatmentInformation } from '../../models/treatment-information';
import { TreatmentInformationDetail } from '../../models/treatment-information-details';
import { GeneralHelperService } from '../general-helper.service';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class TreatmentInformationService {

  treatmentComponentSource = new Subject<boolean>();
  treatmentDetailsComponentSource = new Subject<boolean>();
  treatmentinformation: TreatmentInformation[] = [];
  // Observable string streams
  treatmentInformationComponent = this.treatmentComponentSource.asObservable();
  treatmentDetailsComponent = this.treatmentDetailsComponentSource.asObservable()
  treatmentInformationDetails: TreatmentInformationDetail[] = [];
  treatmentDetails: TreatmentInformationDetail[];
  currentComponentServeName: string;

  constructor(
    private summaryService: SummaryService,
    private router: Router,
    private generalService: GeneralHelperService
  ) { }


  public getTreatmentInformationDetails() {
    return this.treatmentInformationDetails;
  }

  public setTreatmentInformation(treatmentInformation: TreatmentInformation[]) {
    this.treatmentinformation = treatmentInformation;
    console.log('treatmentinformation from service', this.treatmentinformation);
  }

  public getTreatmentInformation() {
    return this.treatmentinformation;
  }
  // reference https://stackoverflow.com/questions/57668759/how-to-call-a-component-method-from-service-class-angular
  setTreatmentDetails(data: TreatmentInformationDetail[]) {
    this.treatmentInformationDetails = data;

    console.log(this.treatmentInformationDetails);
    // for(let i = 0; i< this.treatmentInformationDetails.length; i++){
    //   if(this.treatmentInformationDetails)
    // }
    this.convertMedicineInInventoyDetailsToTableData();
  }

  returnTreatmentDataComponent() {
    if (this.currentComponentServeName == 'treatmentDetailsComponent') {
      this.treatmentDetailsComponentSource.next(null);
    } else if (this.currentComponentServeName == 'addTreatmentComponent') {
      this.treatmentComponentSource.next(null);

    }
  }

  convertMedicineInInventoyDetailsToTableData() {
    var result = []
    for (var i = 0; i < this.treatmentInformationDetails.length; i++) {
      var data = JSON.parse(JSON.stringify(this.treatmentInformationDetails[i]));
      var found = false;
      for (var j = 0; j < result.length; j++) {
        if (result[j].medicineId === data.medicineId) {
          found = true;
          result[j].quantity = +result[j].quantity + +data.quantity;
        }
      }
      if (!found) {
        result.push(JSON.parse(JSON.stringify(data)));
      }
    }
    for (let i = 0; i < this.treatmentinformation.length; i++) {
      for (let j = 0; j < result.length; j++) {
        if (result[j].medicineId == this.treatmentinformation[i].medicineId) {
          result[j].indicationToDrink = this.treatmentinformation[i].indicationToDrink
        }
      }
    }
    console.log('grouped:', result);

    this.treatmentinformation = result;
  }

  getMedicineDetail(id: string) {
    this.summaryService.getMedicine(id).subscribe(
      (response) => {
        return response.data.name;
      }, (error) => {
        return null;
      }
    )
  }

  // getMedicineInInventoryDetails(){
  //   this.medicines.
  // }

  getTipTreatmentInformationDetails(id: any) {
    var treatment = this.treatmentInformationDetails.filter(treatment => treatment.medicineId.includes(id));
    var tip = [];
    for (let i = 0; i < treatment.length; i++) {
      tip.push(treatment[i].quantity + ' ' + treatment[i].unitName + ' có hạn sử dụng ' + treatment[i].expiredDate + " \n ");

    }
    return tip;
  }



  getTreatment(id: any, param: any) {

    this.summaryService.getTreatmentDetails(id, param).subscribe(
      (response) => {
        this.router.navigate(['/treatment-information-management/treatment-information', id], {
          fragment: response.data
        });
        console.log(response.data);
      },
      (error) => {
        this.router.navigate(['/treatment-information-management/treatment-information-list']);
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    )
  }
}
