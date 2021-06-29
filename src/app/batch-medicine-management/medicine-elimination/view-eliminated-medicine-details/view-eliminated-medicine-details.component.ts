import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { updateEliminatedMedicineRequest } from 'src/app/shared/requests/update-eliminate-medicine-request';
import { EliminatedMedicineResponse } from 'src/app/shared/responses/eliminated-medicine-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineEliminationService } from 'src/app/shared/services/medicine-elimination/medicine-elimination.service';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-view-eliminated-medicine-details',
  templateUrl: './view-eliminated-medicine-details.component.html',
  styleUrls: ['./view-eliminated-medicine-details.component.scss']
})
export class ViewEliminatedMedicineDetailsComponent implements OnInit {

  id: any;
  eliminatedMedicineDetailsForm: FormGroup;
  eliminatedMedicineDetails: EliminatedMedicineResponse;
  numberPattern = '[0-9]*';
  isEditing = false;
  totalQuantity: number;
  param = 'quantity, medicine.name, createDate, updateDate, reason, medicineInInventoryDetail.importMedicine, medicineInInventoryDetail, medicine.medicineSubGroup, medicine.medicineClassification, medicine.medicineUnit';

  constructor(
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private summaryService: SummaryService,
    private eliminateMedicineService: MedicineEliminationService,
    private generalService: GeneralHelperService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.eliminatedMedicineDetailsForm = this.formBuilder.group(
      {
        medicineInInventoryDetailId: [''],
        quantity: [''
          // Validators.max(this.eliminatedMedicineDetails.batchMedicineInInventory.quantity),
        ],
        reason: [''],
      }
    );
    this.getEliminatedMedicineDetails();
  }

  disableUpdate() {
    this.isEditing = false;
    this.eliminatedMedicineDetailsForm.controls['quantity'].disable();
    this.eliminatedMedicineDetailsForm.controls['reason'].disable();

  }

  enableUpdate() {
    this.isEditing = true;
    this.eliminatedMedicineDetailsForm.controls['quantity'].enable();
    this.eliminatedMedicineDetailsForm.controls['reason'].enable();
  }


  get f() {
    return this.eliminatedMedicineDetailsForm.controls;
  }

  getEliminatedMedicineDetails() {
    this.disableUpdate();
    this.summaryService.getEliminatedMedicineDetails(this.id, this.param).subscribe(
      (response) => {
        this.eliminatedMedicineDetails = response.data;
        console.log(this.eliminatedMedicineDetails);
        this.eliminatedMedicineDetailsForm.setValue({
          medicineInInventoryDetailId: this.eliminatedMedicineDetails.medicineInInventoryDetail.id,
          quantity: this.eliminatedMedicineDetails.quantity,
          reason: this.eliminatedMedicineDetails.reason,
        });
        this.totalQuantity = this.eliminatedMedicineDetails.medicineInInventoryDetail.quantity + this.eliminatedMedicineDetails.quantity
        this.eliminatedMedicineDetailsForm.controls['quantity'].setValidators([
          Validators.pattern(this.numberPattern),
          Validators.required,
          Validators.min(1), Validators.max(this.totalQuantity)]);

        console.log(response);
      }, (error) => {
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    );
  }

  updatetEliminatedMedicine(data: any) {
    if (this.eliminatedMedicineDetailsForm.invalid) {
      this.generalService.createErrorNotification("Hãy điền chính xác các thông tin");
      return;
    }
    console.log(data);
    this.summaryService.updateEliminatedMedicineDetails(this.id, data).subscribe(
      (response) => {
        console.log(response);
        this.getEliminatedMedicineDetails();
      }, (error) => {
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    );
  }

}
