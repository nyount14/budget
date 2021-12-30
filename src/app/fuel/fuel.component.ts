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
  balance: number;
  amount: number;
  loadedTransactions: Transaction[] = [];
  transactionType = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.onReturn();
    // return this.http
    //   .get<Transaction>(
    //     'https://money-manager-9ab10-default-rtdb.firebaseio.com/fuel.json'
    //   )
    //   .pipe(
    //     map((responseData) => {
    //       const postsArray: Transaction[] = [];
    //       for (const key in responseData) {
    //         if (responseData.hasOwnProperty(key))
    //           postsArray.push({ ...responseData[key], id: key });
    //       }
    //       return postsArray;
    //     })
    //   )
    //   .subscribe((posts) => {
    //     this.loadedTransactions = posts;
    //   });
  }

  onCreatePost(postData) {
    if (!this.balance) this.balance = 0;

    if (postData.transactionType == 'credit') {
      this.balance = this.balance + parseInt(postData.amount);
    } else {
      this.balance = this.balance - parseInt(postData.amount);
    }
    this.http
      .post<Transaction>(
        'https://money-manager-9ab10-default-rtdb.firebaseio.com/fuel.json',
        { ...postData, balance: this.balance }
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.loadedTransactions.unshift({ ...postData, balance: this.balance });
      });

    return this.http
      .get<Transaction>(
        'https://money-manager-9ab10-default-rtdb.firebaseio.com/fuel.json'
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

      postData.reset();
  }

  // private fetchBalance() {
  //   this.http
  //     .get('https://money-manager-9ab10-default-rtdb.firebaseio.com/fuel.json')
  //     .subscribe((balance) => {
  //       console.log(balance);
  //     });
  // }

  onReturn() {
    return this.http
      .get<Transaction>(
        'https://money-manager-9ab10-default-rtdb.firebaseio.com/fuel.json'
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
        this.balance = posts[posts.length - 1].balance;
        console.log(posts);
        console.log(this.balance);
        this.loadedTransactions = posts.reverse();
      });
  }

  onDelete(i) {
    this.loadedTransactions.splice(i, 1);
    this.overrideData(this.loadedTransactions);
  }

  overrideData(loadedTransactions) {
    this.http.put(
      'https://money-manager-9ab10-default-rtdb.firebaseio.com/fuel.json',
      loadedTransactions
    )
    .subscribe(response => {
      console.log(response);
    });
  }

}
