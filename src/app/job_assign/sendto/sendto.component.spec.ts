import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendtoComponent } from './sendto.component';

describe('SendtoComponent', () => {
  let component: SendtoComponent;
  let fixture: ComponentFixture<SendtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
