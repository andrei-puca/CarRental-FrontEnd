import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RentalLocations } from './rentallocations.model';
import { RentalLocationsService } from './rentallocations.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-RentalLocations',
  templateUrl: './RentalLocations.component.html',
  styleUrls: ['./RentalLocations.component.css']
})
export class RentalLocationsComponent implements OnInit, AfterViewInit {

  ELEMENT_DATA: RentalLocations[];
  displayedColumns: string[] = ['name', 'city', 'address'];
  dataSource = new MatTableDataSource<RentalLocations>(this.ELEMENT_DATA);

  constructor(private service: RentalLocationsService) { }

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
    let resp = this.service.clientList();
    resp.subscribe(report => this.dataSource.data = report as RentalLocations[])
    console.log(this.dataSource);
  }
}



