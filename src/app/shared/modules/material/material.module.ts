import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatExpansionModule
];

@NgModule({
  exports: [...MATERIAL_MODULES],
})
export class MaterialModule { }
