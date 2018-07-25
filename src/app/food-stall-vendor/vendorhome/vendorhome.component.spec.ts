import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorhomeComponent } from './vendorhome.component';

describe('VendorhomeComponent', () => {
  let component: VendorhomeComponent;
  let fixture: ComponentFixture<VendorhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
