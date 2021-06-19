import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicineInInventoryResponse } from 'src/app/shared/responses/medicine-in-inventory/medicine-in-inventory';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-medicine-in-inventory-details',
  templateUrl: './medicine-in-inventory-details.component.html',
  styleUrls: ['./medicine-in-inventory-details.component.scss']
})
export class MedicineInInventoryDetailsComponent implements OnInit {

  id: any;

  constructor(
    private summaryService: SummaryService,
    private activatedroute: ActivatedRoute,
  ) { }

  medicineInInventoryDetails : MedicineInInventoryResponse;

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.getMedicineInInventoryDetails();
  }


  getMedicineInInventoryDetails() {
    this.summaryService.getMedicineInInventoryDetails(this.id).subscribe(
      (response) => {
        this.medicineInInventoryDetails = response.data;
        console.log(this.medicineInInventoryDetails);

      },(error) => {
        console.log(error);
      }
    );
  }

}
