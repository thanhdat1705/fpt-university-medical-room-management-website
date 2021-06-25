import { Injectable } from '@angular/core';
import { AddImportBatchRequest } from '../../requests/ImportBatchMedicine/import-batch-medicine';
import { SearchRequest } from '../../requests/search-request';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class ImportBatchService {

  constructor(private service: SummaryService) { }


  addImportBatch(data: AddImportBatchRequest) {
    return this.service.addImportBatch(data);
  }

  searchImportBatches(data: SearchRequest) {
    return this.service.searchImportBatch(data);
  }

  getDetailImportBatch(id: string) {
    return this.service.getDetailImportBatch(id);
  }

  //  Import Medicine
  addImportMedicine(data: any, id: string) {
    return this.service.addImportMedicine(data, id);
  }
  updateImportMedicine(data: any, id: string) {
    return this.service.updateImportMedicine(data, id);
  }
  deleteImportMedicine(id: string) {
    return this.service.deleteImportMedicine(id);
  }
  searchImportMedicine(data: SearchRequest) {
    return this.service.searchImportMedicine(data);
  }
  
}
