import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DatepickerComponent} from './datepicker.component';
import {NO_ERRORS_SCHEMA, SimpleChange} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents(); // Not required, since Angular compiles everything - including spec files.
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a date when it is passed by the parent component', () => {
    component.date = new Date();
    fixture.detectChanges();

    const datepickerInputElement = fixture.debugElement.query(By.css('input#datepicker'));
    const datepickerValue = datepickerInputElement.properties['ngModel'];

    expect(datepickerValue).not.toBeNull();
    expect(datepickerValue).not.toBeUndefined();
  });

  it('should emit true when the datepicker input is touched', () => {
    spyOn(component.datepickerTouched, 'emit');
    component.markDatepickerAsTouched();
    fixture.detectChanges();

    expect(component.datepickerTouched.emit).toHaveBeenCalled();
  });

  xit('should emit a date when a date is selected', () => {
    const today = new Date();
    spyOn(component.dateValueChanged, 'emit');

    // TODO: Don't know how to invoke dateChange.
    //  Cannot invoke setDateValue, since it requires an event parameter.
    // component.datepicker.select(today); // Does not work

    expect(component.dateValueChanged.emit).toHaveBeenCalled();
    expect(component.dateValueChanged.emit).toHaveBeenCalledWith(today);
  });
});
