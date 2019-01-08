import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase/app';
import { MatCardModule } from '@angular/material';
import { Observable } from 'rxjs';
import { Item } from '../models/items'
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //items: Observable<Item[]>
  users: AngularFireList<Item>;
  name: any;
  email: any;
  id: string;
  total:any=0;
  currentUser: any = this.af.auth.currentUser.uid;
  incomeArray: any[];
  incomeForm: FormGroup;
  income: any = this.db.list('/income');
  constructor(private router: Router, public fb: FormBuilder, public af: AngularFireAuth, public db: AngularFireDatabase) {

    this.af.authState.subscribe(authState => {
      if (authState) {
        this.name = authState.displayName;
        this.email = authState.email;
        this.id = af.auth.currentUser.uid;
      }
      else {
        this.router.navigate(['/login']);
      }
    });

    this.incomeForm = this.fb.group({
      savingsAmount: [Validators.required],
      incomeAmount: ['', Validators.required]
    }
    );
    //this.items = db.list('users').valueChanges();
  }

  insertIncome(value) {
    this.income.push({
      id: this.af.auth.currentUser.uid,
      amount: value.incomeAmount
    })
  }

  editExpense(){
    this.router.navigate(['/expense']);
  } 
  ngOnInit() {
    this.income.snapshotChanges().subscribe(item => {
      this.incomeArray = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.incomeArray.push(y);
      })
      for(var key in this.incomeArray){
        var expense = parseInt((this.incomeArray[key].amount));
        console.log(expense);
        this.total += expense;
      }
    });

  }

}
