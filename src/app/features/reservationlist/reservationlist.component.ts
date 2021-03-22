import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ReservationList } from './reservationlist.model';
import { ReservationListService } from './reservationlist.service';
import {MatSort} from '@angular/material/sort';
/**
 * @title Table with pagination
 */
@Component({
  selector: "app-reservationlist",
  styleUrls: ['reservationlist.component.css'],
  templateUrl: "./reservationlist.component.html",
  
})
export class ReservationListComponent implements OnInit, AfterViewInit  {

  ELEMENT_DATA: ReservationList[];
  displayedColumns: string[] = ['fullName', 'brand', 'model', 'rentalStartDate', 'rentalEndDate', 'pickUpLocation', 'dropOffLocation', 'totalPrice', 'createdOn'];

  dataSource = new MatTableDataSource<ReservationList>(this.ELEMENT_DATA);

  constructor(private service: ReservationListService) { }

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
  let resp = this.service.reservationList();
  resp.subscribe(report => this.dataSource.data= report as ReservationList[])
  console.log(this.dataSource.data);
}

}


