import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-eliminate-medicine',
  templateUrl: './eliminate-medicine.component.html',
  styleUrls: ['./eliminate-medicine.component.scss']
})
export class EliminateMedicineComponent implements OnInit {

  eliminateMedicineForm: FormGroup;
  numberPattern = '[0-9]*'
  medicineName: string = "Lào";


  constructor(
    private modalService: NzModalService,
    private formBuider: FormBuilder,
    private generalService: GeneralHelperService,
    private summaryService: SummaryService
  ) { }

  ngOnInit(): void {
    this.eliminateMedicineForm = this.formBuider.group({
      batchMedicineId: ['1'],
      quantity: ['', [
        Validators.pattern(this.numberPattern),
        Validators.required,
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
    console.log("data huy" + data)
    this.summaryService.eliminateMedicine(data).subscribe(
      (response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    )
  }

}
