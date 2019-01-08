import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {UserService} from './user.service';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from "@angular/router";
import {FlexLayoutModule} from '@angular/flex-layout';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AngularFireModule} from 'angularfire2';
import { environment } from '../environments/environment';
import {AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireDatabaseModule,  AngularFireList } from 'angularfire2/database';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { DashboardusersComponent } from './dashboardusers/dashboardusers.component';
import { MatToolbarModule,MatTooltipModule, MatFormFieldModule } from '@angular/material';
import { MatSidenavModule,MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatIconModule, MatSelectModule } from '@angular/material';
import { MatListModule, MatTabsModule } from '@angular/material';
import { NavbarListComponent } from './navbar-list/navbar-list.component';
import { NavtabsComponent } from './navtabs/navtabs.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { MatButtonModule } from '@angular/material/button';

import { BudgetService } from './budget.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LandingPageComponent,
    
    DashboardusersComponent,
    NavbarListComponent,
    NavtabsComponent,
    IncomeComponent,
    ExpenseComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    [BrowserAnimationsModule],
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatNativeDateModule,
    MatSidenavModule, MatListModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatDatepickerModule,
    RouterModule.forRoot([
      {
      path: 'navbar',
      component: NavbarComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'navtabs',
        component: NavtabsComponent
      },
      {
      path: 'login',
      component: LoginComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'home',
        component: LandingPageComponent
      },
      {
        path: 'budget',
        component: IncomeComponent
      },
      {
        path: 'expense',
        component: ExpenseComponent
      },
      {
        path: '',
       redirectTo: '/home',
        pathMatch:'full'
      }

    ])
  ],
  
  providers: [UserService,BudgetService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
