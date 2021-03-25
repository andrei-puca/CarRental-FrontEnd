import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarDetailsService } from './car-details.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  public selectedUserId : string;
  myid: any = [];
  cars: any = [];
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,private service: CarDetailsService ){
    this.myid = this._router.getCurrentNavigation().extras.state; 
   }


  ngOnInit() {
    console.log(this.myid);
    
    this.service.getService(this.myid.id).subscribe(data => {
      this.cars = data;
    })

  }

  onSubmit(){
    this._router.navigate(['cars']);
  }
}
