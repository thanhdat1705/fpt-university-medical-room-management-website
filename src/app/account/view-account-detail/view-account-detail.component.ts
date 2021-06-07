import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-view-account-detail',
  templateUrl: './view-account-detail.component.html',
  styleUrls: ['./view-account-detail.component.scss']
})
export class ViewAccountDetailComponent implements OnInit {

  id: any;
  accountDetail: Account;


  constructor(
    private summaryService: SummaryService,
    private activatedroute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
  }

  getAccountDetail() {
    this.summaryService.getAccountDetail(this.id).subscribe(
      (response) => {
        console.log(response);
        this.accountDetail = response.data;
      },
      (error) => {
        console.log(error);
      },
    )
  }

}
