import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenJobPopupComponent } from './open-job-popup.component';

describe('OpenPopupComponent', () => {
  let component: OpenJobPopupComponent;
  let fixture: ComponentFixture<OpenJobPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenJobPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenJobPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
