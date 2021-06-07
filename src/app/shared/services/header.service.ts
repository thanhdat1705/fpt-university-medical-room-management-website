import { Injectable } from '@angular/core';
import { HeaderComponent } from '../template/header/header.component';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  avatar = localStorage.getItem('avatar');

  public getAvatar() {
    return this.avatar;
  }


  public setAvatar(url: any) {
    localStorage.setItem('avatar', url);
    this.avatar = url;
  }
}
