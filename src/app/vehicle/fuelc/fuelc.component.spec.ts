import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelcComponent } from './fuelc.component';

describe('FuelcComponent', () => {
  let component: FuelcComponent;
  let fixture: ComponentFixture<FuelcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
