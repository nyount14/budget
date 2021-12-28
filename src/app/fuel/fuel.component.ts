import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css'],
})
export class FuelComponent implements OnInit {
  balance: number = 0;
  amount: number;
  loadedTransactions: Transaction[] = [];
  transactionType = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.http
      .get<{ balance: number }>(
        'https://money-manager-9ab10-default-rtdb.firebaseio.com/posts.json'
      )
      .subscribe((balance) => {
        return this.balance;
      });
  }

  onCreatePost(postData) {
    if (postData.transactionType == 'credit') {
        this.balance = this.balance + parseInt(postData.amount);
      } else {
        this.balance = this.balance - parseInt(postData.amount);
      }
    this.http
      .post<Transaction>(
        'https://money-manager-9ab10-default-rtdb.firebaseio.com/posts.json',
        {...postData, balance: this.balance}
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  private fetchBalance() {
    this.http
      .get('https://money-manager-9ab10-default-rtdb.firebaseio.com/posts.json')
      .subscribe(balance => {
        console.log(balance);
      });
  }

  onReturn() {
    return this.http
      .get<Transaction>(
        'https://money-manager-9ab10-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((responseData) => {
          const postsArray: Transaction[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key))
              postsArray.push({ ...responseData[key], id: key });
          }
          return postsArray;
        })
      )
      .subscribe((posts) => {
        this.loadedTransactions = posts;
      });
  }
}
