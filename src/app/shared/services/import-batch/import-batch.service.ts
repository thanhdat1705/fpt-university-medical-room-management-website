import { Injectable } from '@angular/core';
import { AddImportBatchRequest } from '../../requests/ImportBatchMedicine/import-batch-medicine';
import { SearchRequest } from '../../requests/search-request';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class ImportBatchService {
  isUpdate = false;
  constructor(private service: SummaryService) { }

  setIsUpdate(update: boolean) {
    this.isUpdate = update;
  }

  getIsUpdate() {
    return this.isUpdate;
  }

  addImportBatch(data: AddImportBatchRequest) {
    return this.service.addImportBatch(data);
  }

  searchImportBatches(data: any) {
    return this.service.searchImportBatch(data);
  }

  getDetailImportBatch(id: string, selectFields: string) {
    return this.service.getDetailImportBatch(id, selectFields);
  }

  //  Import Medicine
  addImportMedicine(data: any, id: string) {
    return this.service.addImportMedicine(data, id);
  }
  updateImportMedicine(data: any, id: string,  selectFields: string) {
    return this.service.updateImportMedicine(data, id,  selectFields);
  }
  deleteImportMedicine(id: string) {
    return this.service.deleteImportMedicine(id);
  }
  searchImportMedicine(data: any) {
    return this.service.searchImportMedicine(data);
  }

  getDetailImportMedicine(id: string, selectFields: string) {
    return this.service.getDetailImportMedicine(id, selectFields);
  }

}
