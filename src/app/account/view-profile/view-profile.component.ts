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
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiJiY2FjNzgwYy04YmY0LTQ4NjMtODRkYS00M2UwZWQzNWY0M2EiLCJEaXNwbGF5TmFtZSI6ImRvbyIsIkVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlIjoiMiIsIm5iZiI6MTYyMjI2NzY1MiwiZXhwIjoxNjIyODcyNDUyLCJpYXQiOjE2MjIyNjc2NTJ9.rLvkal0HzIiu4XZErB4yRo-eH23BnP8zzHNZvCCd-Zw");
    this.summaryService.setTokenHeader();
    this.getProfile();
  }

  profile: Account

  editProfile(){
    this.router.navigate(['/account/edit-profile', JSON.stringify(this.profile)]);
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
