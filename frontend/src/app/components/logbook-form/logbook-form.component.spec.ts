import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogbookFormComponent } from './logbook-form.component';

describe('LogbookFormComponent', () => {
  let component: LogbookFormComponent;
  let fixture: ComponentFixture<LogbookFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogbookFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
