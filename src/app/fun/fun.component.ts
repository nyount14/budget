import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fun',
  templateUrl: './fun.component.html',
  styleUrls: ['./fun.component.css']
})
export class FunComponent implements OnInit {
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
