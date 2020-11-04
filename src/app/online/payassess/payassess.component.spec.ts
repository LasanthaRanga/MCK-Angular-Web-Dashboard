import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayassessComponent } from './payassess.component';

describe('PayassessComponent', () => {
  let component: PayassessComponent;
  let fixture: ComponentFixture<PayassessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayassessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayassessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
