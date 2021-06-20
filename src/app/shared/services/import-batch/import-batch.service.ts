import { Injectable } from '@angular/core';
import { AddImportBatchRequest } from '../../requests/ImportBatchMedicine/import-batch-medicine';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class ImportBatchService {

  constructor(private service: SummaryService) { }


  addImportBatch(data: AddImportBatchRequest) {
    return this.service.addImportBatch(data);
  }
}
