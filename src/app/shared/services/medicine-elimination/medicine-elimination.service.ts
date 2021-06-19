import { Injectable } from '@angular/core';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineEliminationService {

  id: any;
  unitName: any;
  name: any;
  quantity: number;

  constructor(private summaryService: SummaryService) { }

  deleteEliminatedMedicine(id: any) {
    this.summaryService.deleteEliminatedMedicineDetails(id).subscribe(
      (response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    );
  }

  setMedicineId(id: any) {
    this.id = id;
  }
  getMedicineId() {
    return this.id;
  }
  setMedicineUnit(unitName: any) {
    this.unitName = unitName;
  }
  getMedicineUnit() {
    return this.unitName;
  }
  setMedicineName(name: any) {
    this.name = name;
  }
  getMedicineName() {
    return this.name;
  }
  setMedicineQuantity(quantity: any) {
    this.quantity = quantity;
  }
  getMedicineQuantity() {
    return this.quantity;
  }
}
