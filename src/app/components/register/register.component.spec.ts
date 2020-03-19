import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RegisterComponent} from './register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from '../../_services/user.service';
import {CacheService} from '../../_services/cache.service';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginComponent} from '../login/login.component';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent, LoginComponent ],
      imports: [
        ReactiveFormsModule, HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ]),
      ],
      providers: [UserService, CacheService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
