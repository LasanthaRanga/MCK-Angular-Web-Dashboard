import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServceComponent } from './servce.component';

describe('ServceComponent', () => {
  let component: ServceComponent;
  let fixture: ComponentFixture<ServceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
