import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensComponent } from './licens.component';

describe('LicensComponent', () => {
  let component: LicensComponent;
  let fixture: ComponentFixture<LicensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
