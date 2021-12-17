import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../balance.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {
balance;
amount;

  constructor(private balanceservice: BalanceService) { }

  ngOnInit(){
    this.balance = this.balanceservice.fuel
  }

  onCredit(){
    this.balance = this.balance + this.amount;
  }

  onDebit(){
    this.balance = this.balance - this.amount;
  }

  onUpdate(amount){
    this.amount = amount.target.value;
  }

}
