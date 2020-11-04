import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnhomeComponent } from './onhome.component';

describe('OnhomeComponent', () => {
  let component: OnhomeComponent;
  let fixture: ComponentFixture<OnhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
