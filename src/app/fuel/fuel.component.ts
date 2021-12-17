import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../balance.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {
fuel;
  constructor(private balanceservice: BalanceService) { }

  ngOnInit(){
    this.fuel = this.balanceservice.fuel
  }

  onCredit(){
    console.log
  }

  onDebit(){
    console.log
  }

}
