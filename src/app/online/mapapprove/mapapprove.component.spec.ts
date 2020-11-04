import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapapproveComponent } from './mapapprove.component';

describe('MapapproveComponent', () => {
  let component: MapapproveComponent;
  let fixture: ComponentFixture<MapapproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapapproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
