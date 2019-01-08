import { Injectable } from '@angular/core';
import { Budget } from './budget';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth';
import { ActionSequence } from 'protractor';
import { UserService } from './user.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  uid: any = this.af.auth.currentUser.uid;
  budgetList: AngularFireList<any> = this.db.list('/budget');
  buda: any;
  id: any;
  budgett: Budget = new Budget();
  constructor(private db: AngularFireDatabase, public auth: UserService, public af: AngularFireAuth) {
    //this.buda = this.db.list('/budget').query.orderByChild('id').equalTo(this.uid);
    this.id = af.auth.currentUser.uid;
  }

  getData() {
    this.budgetList = this.db.list('/budget');
    return this.budgetList;
  }

  updateBudget(budget: Budget) {
    this.budgetList.update(budget.$key,
      {
        food: budget.food,
        grocery: budget.grocery,
        bills: budget.bills,
        entertainment: budget.entertainment,
        misc: budget.misc
      });
  }



  insertBudget(budget: Budget) {
    this.db.list("/budget").valueChanges().subscribe(res => {
      console.log(res);

      this.buda = res;
      console.log(this.buda[0]);
      if (this.buda[0] != undefined) {
        for (var key in this.buda) {
          if (this.af.auth.currentUser.uid == this.buda[key].id) {
            var ref = firebase.database().ref("/budget");
            ref.orderByChild("id").equalTo(this.af.auth.currentUser.uid).once("value", function (snapshot) {
              snapshot.forEach(function (element) {
                element.ref.update({
                  food: budget.food,
                  grocery: budget.grocery,
                  bills: budget.bills,
                  entertainment: budget.entertainment,
                  misc: budget.misc
                })
              
              })
            })
         return; }
          else {
            this.budgetList.push({
              id: this.af.auth.currentUser.uid,
              food: budget.food,
              grocery: budget.grocery,
              bills: budget.bills,
              entertainment: budget.entertainment,
              misc: budget.misc
            })

          break;}
          
        }
      } else {
        this.budgetList.push({
          id: this.af.auth.currentUser.uid,
          food: budget.food,
          grocery: budget.grocery,
          bills: budget.bills,
          entertainment: budget.entertainment,
          misc: budget.misc
        })
      }
    })
  }
}
