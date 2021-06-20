import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddBatchMedicineComponent } from './add-batch-medicine/add-batch-medicine.component';

@Component({
  selector: 'app-batch-medicine-list',
  templateUrl: './batch-medicine-list.component.html',
  styleUrls: ['./batch-medicine-list.component.scss']
})
export class BatchMedicineListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  

  


}
