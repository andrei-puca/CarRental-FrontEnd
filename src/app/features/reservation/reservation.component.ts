import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { ReservationService } from './reservation.service';

import { DataSource } from '@angular/cdk/table';
import { Cars } from '../cars/cars.model';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'app/infrastructure/toastr/toastr.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {

  public constructor(public service: ReservationService,
    public translateService: TranslateService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }

  cars: any = [];
  clients: any = [];
  locations: any = [];
  prices: any = [];

  ngOnInit() {
    if (!this.service.formData) {
      this.resetForm();
    }

    this.service.getAvailableCars().subscribe(data => {
      console.log(data);
      this.cars = data;
    })
    this.service.getClients().subscribe(clientData => {
      console.log(clientData);
      this.clients = clientData;
    })
    this.service.getLocations().subscribe(locationData => {
      console.log(locationData);
      this.locations = locationData;
    })
    this.service.getPrices().subscribe(pricesData => {
      console.log(pricesData);
      this.prices = pricesData;
    })
  }

  onSubmit(form: NgForm) {

    this.CreateReservation(form);
    
  }
  resetForm(form?: NgForm) {

    if (form != null)
      form.form.reset();
    this.service.formData = {
      ClientId: '',
      carid: '',
      rentalstartdate: new Date(),
      rentalenddate: new Date(),
      pickuplocation: '',
      dropofflocation: '',
      totalprice: 0
    }
  }

  CreateReservation(form: NgForm) {
    this.service.CreateReservation().subscribe(
      res => {
        this.resetForm(form);
        this.translateService.get("reservation.createsuccessful").subscribe((res: string) => {
          setTimeout(() => {
            this.toastrService.info(res);
          }, 50);
        });
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['reservationlist']));
      },
      err => {
      }
    )
  }

}
