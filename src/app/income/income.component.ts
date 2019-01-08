import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Budget } from '../budget'
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  class: any = "hidden";

  budgetForm: FormGroup;
  currentUser: any = this.af.auth.currentUser.uid;
  bud: Budget[];
  constructor(private fb: FormBuilder, public budget: BudgetService, private router: Router, public db: AngularFireDatabase, public af: AngularFireAuth) {
    this.budgetForm = this.fb.group({
      month: [Validators.required],
      food: ['', Validators.required],
      grocery: ['', Validators.required],
      bills: ['', [Validators.required]],
      entertainment: [''],
      misc: ['']
    }
    );

    this.af.authState.subscribe(authState => {
      if (!authState) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    var x = this.budget.getData();
    x.snapshotChanges().subscribe(item => {
      this.bud = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.bud.push(y as Budget);
      })
      
    });
  }

  hide() {
    this.class = "show";
  }

  getVal() {
    this.class = "hidden";
  }

  insert(value) {
    console.log(value);
    this.budget.insertBudget(value);
  }

}
