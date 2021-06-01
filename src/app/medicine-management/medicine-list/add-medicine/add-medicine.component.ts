import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MyErrorStateMatcher } from 'src/app/shared/my-error-state-matcher';
import { SearchMedicineUnitRequest } from 'src/app/shared/requests/medicine-unit/search-request';
import { StoreNewMedicineUnitRequest } from 'src/app/shared/requests/medicine-unit/store-new-request';
import { MedicineUnitResponse } from 'src/app/shared/responses/medicine-unit/medicine-unit-response';
import { MedicineSubgroupResponse } from 'src/app/shared/responses/medicine-subgroup/medicine-subgroup-response';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { MedicineService } from 'src/app/shared/services/medicine/medicine.service';
import { SummaryService } from 'src/app/shared/services/summary.service';

export interface User {
  id: number;
  ahihi: string;
}

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent implements OnInit {
  @ViewChild('unitValue', { read: MatAutocompleteTrigger }) unitComplete: MatAutocompleteTrigger;

  loading = false;
  isUnitEmpty = false;
  isClassEmpty = false;
  isSubgroupEmpty = false;

  idUnit: string;

  medicineForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  unitControl = new FormControl();
  classControl = new FormControl();
  subgroupControl = new FormControl();

  medicineNameMinL = 3;
  medicineNameMaxL = 50;
  patternMedicineName = "^[a-zA-Z0-9]*$";
  patternUnit = "^[0-9]{1,5}$";

  /*----------Unit---------------------------------------------------------------------------------------------*/
  unitList: MedicineUnitResponse[] = [];
  unitListSearch: Observable<MedicineUnitResponse[]>;
  unitSearch: MedicineUnitResponse[] = [];
  /*-----------------------------------------------------------------------------------------------------------*/

  /*----------Class--------------------------------------------------------------------------------------------*/
  classList: MedicineUnitResponse[] = [];
  classListSearch: Observable<MedicineUnitResponse[]>;
  /*-----------------------------------------------------------------------------------------------------------*/

  /*----------Subgroup-----------------------------------------------------------------------------------------*/
  subgroupList: MedicineSubgroupResponse[] = [];
  subgroupListSearch: Observable<MedicineSubgroupResponse[]>;
  /*-----------------------------------------------------------------------------------------------------------*/

  /*----------REQUEST------------------------------------------------------------------------------------------*/
  searchUnitRequest: SearchMedicineUnitRequest = {
    MedicineUnitName: "",
    Limit: 0,
    Page: 0,
    SortField: "",
    SortOrder: 0,
  }
  storeNewMedicineUnitRequest: StoreNewMedicineUnitRequest = {
    Name: "",
    AcronymUnit: "",
  }


  /*-----------------------------------------------------------------------------------------------------------*/

  addMedicine(data: any) {

    console.log(data);
  }

  constructor(private fb: FormBuilder, private service: MedicineService, private generalService: GeneralHelperService) {
    this.filteredOptions = this.options;
  }

  ngOnInit(): void {
    // this.medicineForm = this.fb.group({
    //   medicineName: ['', [
    //     Validators.required,
    //     Validators.minLength(this.medicineNameMinL),
    //     Validators.maxLength(this.medicineNameMaxL),
    //     Validators.pattern(this.patternMedicineName)
    //   ]],
    //   quantity: ['', [
    //     Validators.required,
    //     Validators.pattern(this.patternUnit)
    //   ]],
    //   // medicineUnit: [null, [Validators.required]],
    // });

    this.medicineFormTest = this.fb.group({
      medicineNameTest: ['', [
        Validators.required,
        Validators.minLength(this.medicineNameMinL),
        Validators.maxLength(this.medicineNameMaxL),
        Validators.pattern(this.patternMedicineName)
      ]],
      quantityTest: [1, [
        Validators.required,
      ]],
      unit: [''],
      searchUnit: [''],
      // medicineUnit: [null, [Validators.required]],
    });

    // this.getAllMedicineSubgroup();
    // this.getAllMedicineUnit();
    this.getAllMedicineUnitTest();
  }


  /*----------GET ÂLL------------------------------------------------------------------------------------------*/
  getAllMedicineUnit() {
    this.service.getAllMedicineUnit().subscribe(
      (response) => {
        console.log(response.data);
        this.unitList = response.data;
        this.unitListSearch = this.unitControl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filterUnit(name) : this.unitList.slice())
          );
      },
      (error) => {
        console.log("login error");
        this.generalService.createErrorNotification(error);
      }
    )
  }
  getAllMedicineUnitTest() {
    this.service.getAllMedicineUnit().subscribe(
      (response) => {
        console.log(response.data);
        this.unitList = response.data;
        this.unitSearch = this.unitList;
        console.log("unit search", this.unitSearch);
      },
      (error) => {
        console.log("get all error");
        this.generalService.createErrorNotification(error);
      }
    )
  }

  getAllMedicineSubgroup() {
    this.service.getAllMedicineSubgroup().subscribe(
      (response) => {
        console.log(response.data);
        this.subgroupList = response.data;
        this.subgroupListSearch = this.subgroupControl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filterSubgroup(name) : this.subgroupList.slice())
          );
      },
      (error) => {
        console.log("get all error");
        this.generalService.createErrorNotification(error);
      }
    )
  }

  /*-----------------------------------------------------------------------------------------------------------*/
  // unitChange(newValue) {
  //   var value: string;
  //   value = newValue;
  //   console.log(value.toString() + " --- value");
  //   this.searchUnitRequest.MedicineUnitName = newValue;
  //   console.log(this.searchUnitRequest);
  //   this.service.searchMedicineUnit(this.searchUnitRequest).subscribe(
  //     (response) => {
  //       console.log(response.data.data);
  //       if (response.data.data.length !== 0) {
  //         this.unitList = response.data.data;
  //         this.isUnitEmpty = false;
  //         console.log('not null');
  //       }
  //       else {
  //         this.unitList = [];
  //         this.isUnitEmpty = true;
  //         console.log('null');
  //       }
  //     },
  //     (error) => {
  //       console.log("login error");
  //       this.generalService.createErrorNotification(error);
  //     }
  //   )
  // }

  get f() { return this.medicineFormTest.controls; }

  displayFn(binding: any): string {
    return binding && binding.name ? binding.name : '';
  }


  private _filterSubgroup(name: string): MedicineSubgroupResponse[] {
    const filterValue = name.toLowerCase();
    return this.subgroupList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterUnit(name: string): MedicineUnitResponse[] {
    const filterValue = name.toLowerCase();
    return this.unitList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSelectionUnitChange(event) {
    console.log('onSelectionChange called', event);
  }

  onSelectionSubgroupChange(event) {
    console.log('onSelectionChange called', event.option.value.id);
  }

  // addUnit(value): void {
  //   var name: string;
  //   var acronymUnit: string;

  //   this.storeNewMedicineUnitRequest.Name = value;
  //   this.storeNewMedicineUnitRequest.AcronymUnit = value.str.substring(0, 1);
  //   this.service.storeNewMedicineUnit(this.storeNewMedicineUnitRequest).subscribe(
  //     (response) => {
  //       console.log(response.data);
  //     }
  //   )
  //   console.log('value ----------------------------------------');
  //   console.log(value);
  // }


  /*-----------------------------------------------------------------------------------------------------------*/





  inputValue?: string;
  filteredOptions: string[] = [];
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];





  medicineFormTest!: FormGroup;

  // updateValue(value: string): void {
  //   const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
  //   if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
  //     this.value = value;
  //   }
  //   this.inputQuantity!.nativeElement.value = this.value;
  // }

  unitChange(value: string) {
    console.log('check filter unit change', value);
    const filterValue = value.toLowerCase();
    this.unitList = this.unitSearch.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onChange(value: string): void {
    console.log("chek check", value);
    // this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  selectedUnit: MedicineUnitResponse;

  listOfItem = ['jack', 'lucy'];
  index = 0;

  
  addUnit(value: any): void {
    let data;

    this.storeNewMedicineUnitRequest.Name = value;
    this.storeNewMedicineUnitRequest.AcronymUnit = value.substring(0, 1);

    if (this.unitList.filter(item => item.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) === -1)) {
      this.service.storeNewMedicineUnit(this.storeNewMedicineUnitRequest).subscribe(
        (response) => {
          data = response.data;
          this.unitList = [...this.unitList, data];
        },
        (error) => {
          console.log("store unit error");
          this.generalService.createErrorNotification(error);
        }
      )
      
    }else {
      console.log('duplicate');
    }
    
    // if (this.listOfItem.indexOf(value) === -1) {
    //   this.listOfItem = [...this.listOfItem, input.value || `New item ${this.index++}`];
    // }
  }

  searchUsers(value: any) {
    console.log(value);
  }

  check() {
    console.log(this.medicineFormTest.controls['searchUnit'].value);

  }
}
