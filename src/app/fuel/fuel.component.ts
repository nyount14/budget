import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction.model';

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
    this.http
      .get('https://money-manager-9ab10-default-rtdb.firebaseio.com/posts.json')
      .subscribe((posts) => {
        console.log(posts);
      });
  }

  onCreatePost(postData: {
    amount: number;
    description: string;
    date: Date;
    transactionType: string
  }) {
    console.log(postData)
    // this.balance = this.balance + parseInt(this.amount);
    this.http
      .post<Transaction>(
        'https://money-manager-9ab10-default-rtdb.firebaseio.com/posts.json',
        postData
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
