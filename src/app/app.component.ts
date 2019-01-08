import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'budgetTracker';
  auth:any;
  constructor(private afAuth:AngularFireAuth){
    this.auth = afAuth.authState;
  }
}
