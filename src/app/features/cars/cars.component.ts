import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Cars } from './cars.model';
import { CarsService } from './cars.service';
import {MatSort} from '@angular/material/sort';
/**
 * @title Table with pagination
 */
@Component({
  selector: "app-cars",
  styleUrls: ['cars.css'],
  templateUrl: "./cars.component.html",
  
})
export class CarsComponent implements OnInit, AfterViewInit  {

  ELEMENT_DATA: Cars[];
  displayedColumns: string[] = ['brand', 'model', 'mileage'];
  dataSource = new MatTableDataSource<Cars>(this.ELEMENT_DATA);

  constructor(private service: CarsService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(){
    this.getAll();
    
  }

  ngAfterViewInit()
  {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

public getAll() {
  let resp = this.service.carList();
  resp.subscribe(report => this.dataSource.data= report as Cars[])
}

 


}


