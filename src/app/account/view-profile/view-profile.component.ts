import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Account } from 'src/app/shared/models/account';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {


  private route: ActivatedRoute;

  constructor(private summaryService: SummaryService, private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiJiY2FjNzgwYy04YmY0LTQ4NjMtODRkYS00M2UwZWQzNWY0M2EiLCJEaXNwbGF5TmFtZSI6ImRvbyIsIkVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlIjoiMSIsIm5iZiI6MTYyMjQ4MjI1MCwiZXhwIjoxNjIzMDg3MDUwLCJpYXQiOjE2MjI0ODIyNTB9.fWz9NFz39-_-aPaMR8dgR63oHth1NNPmO7yJ5m9HoQc");
    this.summaryService.setTokenHeader();
    this.getProfile();
  }

  profile: Account

  editProfile(){
    this.router.navigate(['edit-profile', JSON.stringify(this.profile)]);
  }

  getProfile() {
    this.summaryService.getProfile().subscribe(
      (response) => {

        this.profile = response.data;
        console.log("data" + this.profile);

      },
      (error) => {
        console.log(error);
      }

    )
  }

}
