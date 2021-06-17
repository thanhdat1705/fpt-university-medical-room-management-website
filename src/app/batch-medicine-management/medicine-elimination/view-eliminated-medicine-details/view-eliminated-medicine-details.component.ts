import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        batchMedicineId: ['',
        ],
        quantity: ['', [
          Validators.required,
          Validators.pattern(this.numberPattern),
          // Validators.max(this.eliminatedMedicineDetails.batchMedicineInInventory.quantity),
        ]],
        reason: [''],
      }
    );
    this.getEliminatedMedicineDetails();
  }

  disableUpdate(){
    this.isEditing = false;
    this.eliminatedMedicineDetailsForm.controls['quantity'].disable();
    this.eliminatedMedicineDetailsForm.controls['reason'].disable();

  }

  enableUpdate(){
    this.isEditing = true;
    this.eliminatedMedicineDetailsForm.controls['quantity'].enable();
    this.eliminatedMedicineDetailsForm.controls['reason'].enable();

  }


  get f() {
    return this.eliminatedMedicineDetailsForm.controls;
  }

  getEliminatedMedicineDetails() {
    this.disableUpdate();
    this.summaryService.getEliminatedMedicineDetails(this.id).subscribe(
      (response) => {
        this.eliminatedMedicineDetails = response.data;
        console.log(this.eliminatedMedicineDetails);
        this.eliminatedMedicineDetailsForm.setValue({
          batchMedicineId: this.eliminatedMedicineDetails.batchMedicineId,
          quantity: this.eliminatedMedicineDetails.quantity,
          reason: this.eliminatedMedicineDetails.reason,
        });
        this.eliminatedMedicineDetailsForm.controls["quantity"].setValidators([Validators.max(this.eliminatedMedicineDetails.medicineInInventory.quantity)]);

        console.log(response);
      }, (error) => {
        console.log(error);
      }
    );
  }

  updatetEliminatedMedicine(data: updateEliminatedMedicineRequest) {
    if (this.eliminatedMedicineDetailsForm.invalid) {
      this.generalService.createErrorNotification("Hãy điền chính xác các thông tin");
      return;
    }
    if (data.quantity == 0) {
      this.eliminateMedicineService.deleteEliminatedMedicine(this.id);
    } else {
      this.summaryService.updateEliminatedMedicineDetails(this.id, data).subscribe(
        (response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        }
      );
      this.getEliminatedMedicineDetails();
    }
  }

}
