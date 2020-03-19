import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavbarComponent} from './navbar.component';
import {NavbarMobileComponent} from './navbar-mobile/navbar-mobile.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceFake;

  beforeEach(async(() => {
    authServiceFake = { isAuthenticated: () => true };
    TestBed.configureTestingModule({
      declarations: [NavbarComponent, NavbarMobileComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [authServiceFake]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should display account button for authenticated users', () => {
    // TODO: instance navbarComponent with fake authService.
    const accountButtonEl = fixture.debugElement.query(By.css('.account-button'));
    expect(accountButtonEl).toBeTruthy();
  });
});
