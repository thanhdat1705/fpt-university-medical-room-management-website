import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';

@Component({
  selector: 'app-link-to-social-account',
  templateUrl: './link-to-social-account.component.html',
  styleUrls: ['./link-to-social-account.component.scss']
})
export class LinkToSocialAccountComponent implements OnInit {

  constructor(
    public authService: AuthService,

  ) { }

  ngOnInit(): void {
  }

}
