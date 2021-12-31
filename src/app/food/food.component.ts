import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from '../transaction.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})

export class FoodComponent implements OnInit {
  balance: number;
  amount: number;
  loadedTransactions: Transaction[] = [];
  transactionType = '';
  @ViewChild('ngForm') inputForm: NgForm;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.onReturn();
    // return this.http
    //   .get<Transaction>(
    //     'https://money-manager-9ab10-default-rtdb.firebaseio.com/food.json'
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
      this.balance = this.balance + parseFloat(postData.amount);
    } else {
      this.balance = this.balance - parseFloat(postData.amount);
    }
    this.http
      .post<Transaction>(
        'https://money-manager-9ab10-default-rtdb.firebaseio.com/food.json',
        { ...postData, balance: this.balance }
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.loadedTransactions.unshift({ ...postData, balance: this.balance });
      });

      return this.http
      .get<Transaction>(
        'https://money-manager-9ab10-default-rtdb.firebaseio.com/food.json'
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

  // private fetchBalance() {
  //   this.http
  //     .get('https://money-manager-9ab10-default-rtdb.firebaseio.com/food.json')
  //     .subscribe((balance) => {
  //       console.log(balance);
  //     });
  // }

  onReturn() {
    return this.http
      .get<Transaction>(
        'https://money-manager-9ab10-default-rtdb.firebaseio.com/food.json'
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
      'https://money-manager-9ab10-default-rtdb.firebaseio.com/food.json',
      loadedTransactions
    )
    .subscribe(response => {
      console.log(response);
    });
  }

}
