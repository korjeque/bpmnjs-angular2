import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobModelerComponent } from './job-modeler.component';

describe('JobModelerComponent', () => {
  let component: JobModelerComponent;
  let fixture: ComponentFixture<JobModelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobModelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobModelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
