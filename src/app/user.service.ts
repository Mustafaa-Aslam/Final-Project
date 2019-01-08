import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  uid = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      }
      else {
        return authState.uid;
      }
    })
  );
  isAdmin = observableOf('true');
  id: any;
  authState:any;
  dbUser: AngularFireList<any>;
  constructor(private afAuth: AngularFireAuth, private firebase: AngularFireDatabase, private router: Router) {
    this.authState= this.afAuth.authState;
    if(this.authState){
      this.id=this.authState.uid;
      console.log(this.id);
    }
    }
  

  getData() {
    this.dbUser = this.firebase.list('/users');
    return this.dbUser;
  }
  async register(value) {
    var state = this.afAuth.auth.createUserWithEmailAndPassword(value.Email, value.Password);

    if (state) {

      this.getData().push({
        id: this.afAuth.auth.currentUser.uid,
        email: value.Email,
        Password: value.Password,
        Name: value.firstName
      });
      alert("SUCCESS");
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    }
  }

  async googlelogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    var profile1 = provider.addScope('profile');
    var email1 = provider.addScope('email');
    var openid = provider.addScope('openid');
    var state = this.afAuth.auth.signInWithPopup(provider);
    console.log(state);
    if (state) {
      console.log("success");
      this.getData().push({
        id: firebase.auth().currentUser.uid,
        email: email1,
        profile: profile1,
        openid: openid
      });
      alert("SUCCESS");
    }
  }

  async loginFacebook() {
    var state;
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      state = this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
      if (state) {
        this.getData().push({
          id: firebase.auth().currentUser.uid,
          email: "facxebook@gmail.com"
        })
      }
    })
  }


  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
