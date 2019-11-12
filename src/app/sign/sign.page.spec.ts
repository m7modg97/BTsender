import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignPage } from './sign.page';

describe('SignPage', () => {
  let component: SignPage;
  let fixture: ComponentFixture<SignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
