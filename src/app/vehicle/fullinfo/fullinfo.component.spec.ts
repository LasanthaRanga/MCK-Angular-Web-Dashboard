import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullinfoComponent } from './fullinfo.component';

describe('FullinfoComponent', () => {
  let component: FullinfoComponent;
  let fixture: ComponentFixture<FullinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
