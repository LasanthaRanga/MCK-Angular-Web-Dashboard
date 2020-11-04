import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersubjectsComponent } from './usersubjects.component';

describe('UsersubjectsComponent', () => {
  let component: UsersubjectsComponent;
  let fixture: ComponentFixture<UsersubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
