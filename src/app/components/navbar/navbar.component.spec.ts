import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavbarComponent} from './navbar.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {AuthService} from '../../_services/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [AuthService],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents(); // Not required, since Angular compiles everything - including spec files.
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    // Ensure user is not authenticated on initialization.
    component.isAuthenticated = false;
    component.isAdministrator = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only display login button when user is not authenticated', () => {
    let loginButtonElement = fixture.debugElement.query(By.css('.login-button'));
    expect(loginButtonElement).not.toBeNull();

    component.isAuthenticated = true;
    fixture.detectChanges();

    loginButtonElement = fixture.debugElement.query(By.css('.login-button'));
    expect(loginButtonElement).toBeNull();
  });

  it('should only display account button when user is authenticated', () => {
    let accountButtonDe = fixture.debugElement.query(By.css('.account-button'));
    expect(accountButtonDe).toBeNull();

    component.isAuthenticated = true;
    fixture.detectChanges();

    accountButtonDe = fixture.debugElement.query(By.css('.account-button'));
    expect(accountButtonDe).not.toBeNull();
  });

  it('should only display administrator links when user is an administrator', () => {
    let administratorLinksDe = fixture.debugElement.query(By.css('.administrator-links'));
    expect(administratorLinksDe).toBeNull();

    component.isAuthenticated = true;
    component.isAdministrator = true;
    fixture.detectChanges();

    administratorLinksDe = fixture.debugElement.query(By.css('.administrator-links'));
    expect(administratorLinksDe).not.toBeNull();
  });
});
