import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
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
