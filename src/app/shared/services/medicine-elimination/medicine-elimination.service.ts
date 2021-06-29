import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineEliminationService {

  id: any;
  unitName: any;
  batch: any;
  quantity: number;
  eliminateMedicineComponentSource = new Subject<boolean>();
  eliminateMedicineComponent = this.eliminateMedicineComponentSource.asObservable();
  name: any;

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

  reloadMedicineTableAfterEliminate() {
    this.eliminateMedicineComponentSource.next(null);

  }

  setMedicineInInventoryDetailsId(id: any) {
    this.id = id;
  }
  getMedicineInInventoryDetailsId() {
    return this.id;
  }
  setMedicineUnit(unitName: any) {
    this.unitName = unitName;
  }
  getMedicineUnit() {
    return this.unitName;
  }
  setMedicineBatch(batch: any) {
    this.batch = batch;
  }
  getMedicineBatch() {
    return this.batch;
  }
  setMedicineQuantity(quantity: any) {
    this.quantity = quantity;
  }
  getMedicineQuantity() {
    return this.quantity;
  }
  setMedicineName(name: any) {
    this.name = name;
  }
  getMedicineName(){
    return this.name;
  }

}
