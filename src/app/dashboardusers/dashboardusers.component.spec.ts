import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardusersComponent } from './dashboardusers.component';

describe('DashboardusersComponent', () => {
  let component: DashboardusersComponent;
  let fixture: ComponentFixture<DashboardusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
