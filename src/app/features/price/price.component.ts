import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Price } from './price.model';
import { PriceService } from './price.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit, AfterViewInit  {

  ELEMENT_DATA: Price[];
  displayedColumns: string[] = ['brand', 'model', 'price'];
  dataSource = new MatTableDataSource<Price>(this.ELEMENT_DATA);

  constructor(private service: PriceService) { }

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
  let resp = this.service.priceList();
  resp.subscribe(report => this.dataSource.data= report as Price[])
  console.log(this.dataSource);
}

 


}



