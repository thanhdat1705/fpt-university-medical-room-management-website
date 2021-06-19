import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineEliminationService } from 'src/app/shared/services/medicine-elimination/medicine-elimination.service';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-eliminate-medicine',
  templateUrl: './eliminate-medicine.component.html',
  styleUrls: ['./eliminate-medicine.component.scss']
})
export class EliminateMedicineComponent implements OnInit {

  eliminateMedicineForm: FormGroup;
  numberPattern = '[0-9]*'
  medicineID: string;
  medicineUnitName: string;
  medicineName: string;
  medicineQuantity: number;
  isConfirmLoading = false;

  constructor(
    private modalService: NzModalService,
    private formBuider: FormBuilder,
    private generalService: GeneralHelperService,
    private summaryService: SummaryService,
    private medicineEliminateService: MedicineEliminationService,
    private modal: NzModalRef
  ) { }

  ngOnInit(): void {
    this.medicineID = this.medicineEliminateService.getMedicineId();
    this.medicineUnitName = this.medicineEliminateService.getMedicineUnit();
    this.medicineName = this.medicineEliminateService.getMedicineName();
    this.medicineQuantity = this.medicineEliminateService.getMedicineQuantity();
    this.eliminateMedicineForm = this.formBuider.group({
      medicineInInventoryId: [this.medicineID],
      quantity: ['', [
        Validators.pattern(this.numberPattern),
        Validators.required,
        Validators.min(1),
        Validators.max(this.medicineQuantity),
      ]],
      reason: ['', [
        Validators.required,
      ]],
    });
  }

  get f() {
    return this.eliminateMedicineForm.controls;
  }

  showModal2(): void {
    this.modalService.create({
      nzTitle: 'Hủy thuốc',
      nzContent: EliminateMedicineComponent
    });
  }

  eliminateMedicine(data: any) { 
    this.isConfirmLoading = true;
    if (this.eliminateMedicineForm.invalid) {
      return;
    }
    this.summaryService.eliminateMedicine(data).subscribe(
      (response) => {
        console.log(response);
        this.generalService.messageNz('success', "Đã hủy " + this.eliminateMedicineForm.get("quantity").value + " " + this.medicineUnitName + " " +this.medicineName );
        this.isConfirmLoading = false;
        this.modal.destroy();
      }, (error) => {
        console.log(error);
        this.isConfirmLoading = false;
      }
    );
  }
  destroyModal(): void {
    this.modal.destroy();
  }

}
