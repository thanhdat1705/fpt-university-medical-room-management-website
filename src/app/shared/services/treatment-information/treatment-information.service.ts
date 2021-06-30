import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TreatmentInformation } from '../../models/treatment-information';
import { TreatmentInformationDetail } from '../../models/treatment-information-details';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class TreatmentInformationService {

  treatmentComponentSource = new Subject<boolean>();
  treatmentinformation: TreatmentInformation[];
  // Observable string streams
  treatmentInformationComponent = this.treatmentComponentSource.asObservable();
  treatmentInformationDetails: TreatmentInformationDetail[];
  treatmentDetails: TreatmentInformationDetail[];


  constructor(
    private summaryService: SummaryService,
  ) { }


    public getTreatmentInformationDetails(){
      return this.treatmentInformationDetails;
    }

  public getTreatmentInformation() {
    return this.treatmentinformation;
  }
  // reference https://stackoverflow.com/questions/57668759/how-to-call-a-component-method-from-service-class-angular
  setTreatmentDetails(data: TreatmentInformationDetail[]) {
    this.treatmentInformationDetails = data;
    
    console.log(this.treatmentInformationDetails);
    this.convertMedicineInInventoyDetailsToShowTreatmentDetailsData();
    this.treatmentComponentSource.next(null);
  }

  convertMedicineInInventoyDetailsToShowTreatmentDetailsData() {
    var result = []
    for (var i =    0; i < this.treatmentInformationDetails.length; i++) {
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
    console.log('grouped:', result);
    this.treatmentinformation = result
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
    var tip = '';
    for (let i = 0; i < treatment.length; i++) {
      if (i == treatment.length - 1) {
        tip += treatment[i].quantity + ' ' + treatment[i].unitName + ' có hạn sử dụng ' + treatment[i].expiredDate + '.'
      } else {
        tip += treatment[i].quantity + ' ' + treatment[i].unitName + ' có hạn sử dụng ' + treatment[i].expiredDate + ', '
      }
    }
    return tip;
  }
}
