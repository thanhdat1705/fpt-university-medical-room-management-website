import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntModule, NebularModule, MaterialModule } from "./modules";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from 'src/environments/environment';
import { WaitingComponent } from './components/waiting/waiting.component';


const SHARE_MODULES = [
  AntModule,
  MaterialModule,
  NebularModule 
]

const COMPONENTS = [
  WaitingComponent,
];

export const ANGULAR_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  PerfectScrollbarModule,
  
]
@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    ...ANGULAR_MODULES,
    ...SHARE_MODULES
  ],
  declarations: [...COMPONENTS],
  exports: [...SHARE_MODULES, ...ANGULAR_MODULES, ...COMPONENTS]
})
export class SharedModule {
  static forRoot(name: string = 'default'): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [        
        ...NebularModule.forRoot().providers,        
      ]
    };
  }
  static forChild(name: string = 'default'): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ...NebularModule.forChild().providers,              
      ]
    };
  }
}
