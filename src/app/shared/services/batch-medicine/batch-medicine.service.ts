import { Injectable } from '@angular/core';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class BatchMedicineService {

  constructor(private service: SummaryService) { }
}
