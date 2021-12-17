import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {
balance = 0
amount;

  constructor() { }

  ngOnInit(){
    this.balance;
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
