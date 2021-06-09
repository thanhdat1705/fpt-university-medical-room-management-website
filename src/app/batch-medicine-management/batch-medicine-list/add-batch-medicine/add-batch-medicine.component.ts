import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-batch-medicine',
  templateUrl: './add-batch-medicine.component.html',
  styleUrls: ['./add-batch-medicine.component.scss']
})
export class AddBatchMedicineComponent implements OnInit {

  batchMedicineForm: FormGroup;

  addBatchMedicineLoading = false;
  addItemLoading = false;

  medicineNameMinL = 3;
  medicineNameMaxL = 50;
  descriptionMinL = 1;
  descriptionMaxL = 500;
  patternMedicineName = "^[a-zA-Z0-9\\s]+$";
  patternUnit = "^[0-9]{1,5}$";

  constructor() { }

  ngOnInit(): void {
  }



  addBatchMedicine() {

  }
}
