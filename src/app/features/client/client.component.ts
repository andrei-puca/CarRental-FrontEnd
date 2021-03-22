import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Client } from './client.model';
import { ClientService } from './client.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, AfterViewInit  {

  ELEMENT_DATA: Client[];
  displayedColumns: string[] = ['fullName'];
  dataSource = new MatTableDataSource<Client>(this.ELEMENT_DATA);

  constructor(private service: ClientService) { }

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
  let resp = this.service.clientList();
  resp.subscribe(report => this.dataSource.data= report as Client[])
}

 


}



