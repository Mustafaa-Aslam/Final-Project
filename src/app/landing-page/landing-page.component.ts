import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logincomponent(){
    this.router.navigate(['/login']);
  }

  signupcomponent(){
    this.router.navigate(['/register']);
  }
}
