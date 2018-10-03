import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecProductsComponent } from './rec-products.component';

describe('RecProductsComponent', () => {
  let component: RecProductsComponent;
  let fixture: ComponentFixture<RecProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
