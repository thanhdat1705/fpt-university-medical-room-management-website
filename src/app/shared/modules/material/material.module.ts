import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule
];

@NgModule({
  exports: [...MATERIAL_MODULES],
})
export class MaterialModule { }
