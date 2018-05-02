import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogbookFormDialogBoxComponent } from './logbook-form-dialog-box.component';

describe('LogbookFormDialogBoxComponent', () => {
  let component: LogbookFormDialogBoxComponent;
  let fixture: ComponentFixture<LogbookFormDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogbookFormDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookFormDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
