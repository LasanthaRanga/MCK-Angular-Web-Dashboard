import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatingComponent } from './wating.component';

describe('WatingComponent', () => {
  let component: WatingComponent;
  let fixture: ComponentFixture<WatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
