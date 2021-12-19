import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css'],
})
export class FuelComponent implements OnInit {
  balance = 0;
  amount;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.balance;
  }

  onCredit() {
    this.balance = this.balance + parseInt(this.amount);
    this.http
      .post(
        'https://money-manager-9ab10-default-rtdb.firebaseio.com/posts.json',
        {balance: this.balance}
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  onDebit() {
    this.balance = this.balance - this.amount;
  }

  onUpdate(amount) {
    this.amount = amount.target.value;
  }
}
