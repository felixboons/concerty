import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ArtistService} from '../../../../_services/artist.service';
import {NewArtistComponent} from './new-artist.component';

describe('NewArtistComponent', () => {
  let component: NewArtistComponent;
  let fixture: ComponentFixture<NewArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewArtistComponent],
      providers: [ArtistService],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents(); // Not required, since Angular compiles everything - including spec files.
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    const formElement = fixture.debugElement.query(By.css('form'));
    expect(formElement).toBeTruthy();
  });

  it('form should have a name input field, genre select field and biography textarea field', () => {
    const nameInputElement = fixture.debugElement.query(By.css('input[formControlName=name]'));
    expect(nameInputElement).toBeTruthy();

    const genreSelectElement = fixture.debugElement.query(By.css('select[formControlName=genre]'));
    expect(genreSelectElement).toBeTruthy();

    const biographyTextareaElement = fixture.debugElement.query(By.css('textarea[formControlName=biography]'));
    expect(biographyTextareaElement).toBeTruthy();
  });

  it('form submit button should be disabled on initialization', () => {
    const submitButtonElement = fixture.debugElement.query(By.css('button[type=submit]'));
    const isDisabled = submitButtonElement.properties['disabled'];
    expect(isDisabled).toBeTruthy();
  });

  it('form submit button should enable when form becomes valid, disable otherwise', () => {
    component.form.setValue({
      name: 'John Doe',
      genre: 'HIP_HOP',
      biography: 'This is John Doe.'
    });
    fixture.detectChanges();

    const submitButtonElement = fixture.debugElement.query(By.css('button[type=submit]'));
    let isDisabled = submitButtonElement.properties['disabled'];
    expect(isDisabled).toBeFalsy();

    component.form.controls['name'].reset();
    fixture.detectChanges();

    isDisabled = submitButtonElement.properties['disabled'];
    expect(isDisabled).toBeTruthy();
  });

  xit('form cancel button should re-initialize (and thus invalidate) the form', () => {
    component.form.setValue({
      name: 'John Doe',
      genre: 'HIP_HOP',
      biography: 'This is John Doe.'
    });
    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();

    const cancelButtonElement = fixture.debugElement.query(By.css('a.uk-button:not([type=submit])'));
    expect(cancelButtonElement).toBeTruthy();

    spyOn(component, 'cancel');
    cancelButtonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.cancel).toHaveBeenCalled();
    expect(component.form.valid).toBeFalsy(); // TODO: Form is still valid. Why?
  });
});
