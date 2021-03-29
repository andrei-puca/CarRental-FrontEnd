import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CarsMaintenance } from '../cars-maintenance.model';
import { CarsMaintenanceService } from '../cars-maintenance.service';


@Component({
  selector: 'app-cars-maintenance-modal',
  templateUrl: './cars-maintenance-modal.component.html',
  styleUrls: ['./cars-maintenance-modal.component.css']
})
export class CarsMaintenanceModalComponent implements OnInit {
  
  constructor(public service: CarsMaintenanceService,
    public translateService: TranslateService,
    private toastrService: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<CarsMaintenanceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarsMaintenance) {}

    
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  

  doThat(form: NgForm) {
    console.log(" here2", this.data);
    this.CreateServiceRecord(form.value);
  }

  CreateServiceRecord(data) {
    this.service.CreateServiceRecord(data).subscribe(
      res => {
        this.translateService.get("carservice.createsuccessful").subscribe((res: string) => {
          setTimeout(() => {
            this.toastrService.info(res);
          }, 50);
        });
        this.dialogRef.close();

        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['carsmaintenance']));
      },
      err => {console.log("err");
      }
    )
  }

}
