import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError = '';
  error: any;
  LoginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, public user: UserService, public af: AngularFireAuth) {
    this.createForm();

  }

  createForm() {
    this.LoginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.af.authState.subscribe(authState => {
      if (authState) {
        this.router.navigate(['/dashboard']);
      }
      else {
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnInit() {
  }

  loginFacebook() {
    this.user.loginFacebook();
  }


  loginGoogle() {
    this.user.googlelogin();
  }

  submit(value) {
    console.log(value.Email, value.Password);


    this.af.auth.signInWithEmailAndPassword(value.Email, value.Password
    ).then(
      (success) => {
        console.log(success);
        this.router.navigate(['/dashboard']);

      }).catch(
        (err) => {
          console.log(err);
          this.error = err;
          alert(err);
        })


  }
}
