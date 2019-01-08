import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import {Router} from '@angular/router'

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  database:any = this.db.list('/expense');
  expe:any[];
  total=0;
  category = ['food', 'misc', 'entertainment', 'grocery', 'bills'];
  expenseForm: FormGroup;
  currentUser:any = this.auth.auth.currentUser.uid;
  constructor(private router: Router, private auth : AngularFireAuth, private db: AngularFireDatabase,public fb: FormBuilder) {
    
    this.expenseForm = this.fb.group( {
      category:[Validators.required],
      amount: ['', Validators.required],
    }
    );

    this.auth.authState.subscribe(authState=>{
      if(!authState){
        this.router.navigate(['/login']);
      }
   });
  }
  ngOnInit() {
    
    this.database.snapshotChanges().subscribe(item=>{
    this.expe = [];
    item.forEach(element=>{
      var y = element.payload.toJSON();
      y["$key"]=element.key;
      this.expe.push(y);
    })
    for(var key in this.expe){
      var expense = parseInt((this.expe[key].amount));
      console.log(expense);
      this.total += expense;
    }
    });
  }

  insertExpense(value){
    this.database.push({
      id:this.auth.auth.currentUser.uid,
      category: value.category,
      amount:value.amount
    })
    }
  }


