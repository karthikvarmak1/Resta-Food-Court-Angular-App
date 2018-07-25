import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousordersComponent } from './previousorders.component';

describe('PreviousordersComponent', () => {
  let component: PreviousordersComponent;
  let fixture: ComponentFixture<PreviousordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
