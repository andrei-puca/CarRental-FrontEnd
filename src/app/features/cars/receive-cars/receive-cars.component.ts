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
import { ReceiveCarsService } from './receive-cars.service';

@Component({
  selector: 'app-receive-cars',
  templateUrl: './receive-cars.component.html',
  styleUrls: ['./receive-cars.component.css']
})

export class ReceiveCarsComponent implements OnInit {

  public constructor(public service: ReceiveCarsService,
    public translateService: TranslateService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }

  cars: any = [];


  ngOnInit() {
    if (!this.service.formData) {
      this.resetForm();
    }

    this.service.getRentedCars().subscribe(data => {
      console.log(data);
      this.cars = data;
    })
  }

  onSubmit(form: NgForm) {

    // console.log(form.value.mileage);
    // form.value.mileage = form.value.mileage*1;
    // console.log(form.value.mileage);
    this.markCarAsAvailable(form)
    this.translateService.get("reservation.createsuccessful").subscribe((res: string) => {
      setTimeout(() => {
        this.toastrService.info(res);
      }, 50);
    });
    this.router.navigate(['reservationlist']);
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
     id: '',
     mileage: 0
    }
  }

  markCarAsAvailable(form: NgForm) {
    this.service.markCarAsAvailable().subscribe(
      res => {
        this.resetForm(form);
      },
      err => {
      }
    )
  }

}
