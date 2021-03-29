import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CarsMaintenance } from './cars-maintenance.model';
import { CarsMaintenanceService } from './cars-maintenance.service';
import { MatSort } from '@angular/material/sort';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarsMaintenanceModalComponent } from './cars-maintenance-modal/cars-maintenance-modal.component';


@Component({
  selector: "app-cars-maintenance",
  styleUrls: ['cars-maintenance.component.css'],
  templateUrl: "./cars-maintenance.component.html",

})
export class CarsMaintenanceComponent implements OnInit, AfterViewInit {

  ELEMENT_DATA: CarsMaintenance[];
  displayedColumns: string[] = ['brand', 'model', 'mileageUntilService', 'monthsUntilService', 'action'];
  dataSource = new MatTableDataSource<CarsMaintenance>(this.ELEMENT_DATA);
  user;

  constructor(private service: CarsMaintenanceService, public dialog: MatDialog) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.getAll();

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAll() {
    let resp = this.service.carList();
    resp.subscribe(report => this.dataSource.data = report as CarsMaintenance[])
    console.log(this.dataSource);
  }

  createService(user) {
    const dialogRef = this.dialog.open(CarsMaintenanceModalComponent, {
      width: '270px',
      data: user,
      panelClass: 'my-dialog'
      
    });
    console.log(user);
    dialogRef.afterClosed().subscribe(result => {
      this.user = user;
    });
  }

}




