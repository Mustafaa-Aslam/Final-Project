import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { UserService } from '../user.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  state: string = '';
  error: any;
  uid: any;
  success: any;
  dbUser: AngularFireList<any>;
  UserForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: UserService, private router: Router, public af: AngularFireAuth, private firebase: AngularFireDatabase) {
    this.UserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(4)]]
    }
    );
    this.af.authState.subscribe(authState=>{
      if(authState){
        this.router.navigate(['/dashboard']);
      }
    });
    // this.uid = auth.uid.toPromise();
    // console.log(this.uid);
  }

  ngOnInit() {
  }

  getData() {
    this.dbUser = this.firebase.list('/users');
    return this.dbUser;
  }

  loginFacebook() {
    this.auth.loginFacebook();
  }

  async loginwithGoogle() {
    this.auth.googlelogin();
  }

  async register(value) {
    this.auth.register(value);
  }

}

