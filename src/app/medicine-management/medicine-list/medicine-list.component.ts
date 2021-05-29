import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/shared/models/medicine';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit {

  detailLoading = false;
  tableLoading = true;
  checked = false;

  listOfData: Medicine[] = [
    {
      name: 'John Brown',
      quantity: 32,
      cate: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      quantity: 42,
      cate: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      quantity: 32,
      cate: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      quantity: 32,
      cate: 'London No. 2 Lake Park'
    }
  ];

  listOfDisplayData = [...this.listOfData];

  constructor() { }

  ngOnInit(): void {
    setTimeout(
      () => {
        this.tableLoading = false;
      },
      1500
    );
  }


  showModalCostDetail(cost: any) {

  }

  showModalCostAdd(cost: any) {

  }

  deleteCost(id: string, description: string) {


  }

  confirmAdd() {
    this.checked = false;
  }


}
