import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntModule, NebularModule, MaterialModule } from "./modules";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './components/test/test.component';

const SHARE_MODULES = [
  AntModule,
  MaterialModule,
  NebularModule 
]

const COMPONENTS = [
  TestComponent
];

export const ANGULAR_MODULES = [
  FormsModule,
  ReactiveFormsModule,
]
@NgModule({
  imports: [
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
