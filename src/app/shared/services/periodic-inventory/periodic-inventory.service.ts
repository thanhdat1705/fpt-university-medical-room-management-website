import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetExportImportDateRequest } from '../../requests/periodic-inventory/periodic-inventory-request';
import { GeneralHelperService } from '../general-helper.service';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodicInventoryService {

  constructor(
    private summaryService: SummaryService,
    private router: Router,
    private generalService: GeneralHelperService) { }


  getExportImport(date: Date) {
    let getExportImportInventoryRequest: GetExportImportDateRequest = {
      month : date.getMonth() + 1,
      year : date.getFullYear()
    }
    return this.summaryService.getExportImport(getExportImportInventoryRequest);
  }
}
