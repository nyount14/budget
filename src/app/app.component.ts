import { Component } from '@angular/core';
import { BalanceService } from './balance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'budget';
  fuel;

  constructor(private balanceservice: BalanceService) { }


}
