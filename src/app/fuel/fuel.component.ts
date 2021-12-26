import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http
      .get<Transaction>('https://money-manager-9ab10-default-rtdb.firebaseio.com/posts.json?auth=' + user.token
      );
    }),
    map(responseData => {
      const postsArray: Transaction[] = [];
        for (const key in responseData ) {
          if (responseData.hasOwnProperty(key))
          postsArray.push({ ...responseData[key], id: key })
        }
        return postsArray;
      }))
      .subscribe(posts => {
        this.loadedTransactions = posts;
      });
  }

  onCreatePost(postData) {
    console.log(postData)
    // this.balance = this.balance + parseInt(this.amount);
    this.http
      .post<{ name: string }>(
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

