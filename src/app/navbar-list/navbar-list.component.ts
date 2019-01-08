import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from 'src/app/user.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-navbar-list',
  templateUrl: './navbar-list.component.html',
  styleUrls: ['./navbar-list.component.css']
})
export class NavbarListComponent implements OnInit {

  constructor(private router:Router,public af:AngularFireAuth) { }

  ngOnInit() {
  }

  logout(){
    this.af.auth.signOut();
    this.router.navigate(['/login']);
  }
}
