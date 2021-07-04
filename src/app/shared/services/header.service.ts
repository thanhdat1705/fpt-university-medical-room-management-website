import { Injectable } from '@angular/core';
import { HeaderComponent } from '../template/header/header.component';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
  ) {
  }

  avatar = localStorage.getItem('photoUrl');
  name = localStorage.getItem('displayName');
  roleName = localStorage.getItem('roleName');

  public getAvatar() {
    return this.avatar;
  }

  public setAvatar(avatarUrl: any) {
    this.avatar = avatarUrl;
  }

  public getName() {
    return this.name;
  }

  public setName(name: any) {
    this.name = name;
  }

  public getRole() {
    return this.roleName;
  }

  public setRole(role: any) {
    this.roleName = role;
  }
}
