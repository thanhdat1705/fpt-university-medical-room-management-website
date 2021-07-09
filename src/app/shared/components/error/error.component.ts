import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOGINLOGO, LOGOAPP } from 'src/assets/images/logo/logo';
import { ERROR404 } from 'src/assets/others/others-image';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  errorBackground = ERROR404;
  errorLogo = LOGINLOGO;
  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  backToMain() {
    this.router.navigate(['medicine-management/medicine-list']);
  }
}
