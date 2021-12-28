import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction.model';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css'],
})
export class FuelComponent implements OnInit {
  balance = 0;
  amount;
  loadedTransactions: Transaction[] = [];
  transactionType = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    //return last transaction
    // if (last transaction == 'credit') {
    //   this.balance = this.balance + last transaction);
    // } else {
    //   this.balance = this.balance - last transaction);
  }

  onCreatePost(postData) {
    console.log(postData);
    this.http
      .post<Transaction>(
        'https://money-manager-9ab10-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe((responseData) => {
        if (postData.transactionType == 'credit') {
          this.balance = this.balance + parseInt(postData.amount);
        } else {
          this.balance = this.balance - parseInt(postData.amount);
        }

    this.http.post<{ balance: number }>(
      'https://money-manager-9ab10-default-rtdb.firebaseio.com/posts.json',
      postData
    )
    .subscribe((responseData) => {
      console.log(this.balance);
    })
  });
  }

  // onDebit() {
  //   this.balance = this.balance - this.amount;
  // }

  // onUpdate(amount) {
  //   this.amount = amount.target.value;
  // }
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
