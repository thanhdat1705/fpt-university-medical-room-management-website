import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicineInInventoryResponse } from 'src/app/shared/responses/medicine-in-inventory/medicine-in-inventory';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-medicine-in-inventory-details',
  templateUrl: './medicine-in-inventory-details.component.html',
  styleUrls: ['./medicine-in-inventory-details.component.scss']
})
export class MedicineInInventoryDetails implements OnInit {

  id: any;
  param = "id, quantity, createdDate, importMedicine, medicine, medicine.medicineClassification,medicine.medicineSubgroup, importMedicine.importBatch, periodicInventory";
  constructor(
    private summaryService: SummaryService,
    private activatedroute: ActivatedRoute,
    private generalService: GeneralHelperService
  ) { }

  medicineInInventoryDetails: MedicineInInventoryResponse;

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.activatedroute.fragment.subscribe(
      (response) => {
        console.log(response)
        this.medicineInInventoryDetails = JSON.parse(JSON.stringify(response));

        if (this.medicineInInventoryDetails === null) {
          this.getMedicineInInventoryDetails();
        }
      }
    );
  }


  getMedicineInInventoryDetails() {
    this.summaryService.getMedicineInInventoryDetails(this.id, this.param).subscribe(
      (response) => {
        this.medicineInInventoryDetails = response.data;
        console.log(this.medicineInInventoryDetails);

      }, (error) => {
        console.log(error);
      }
    );
  }

}
