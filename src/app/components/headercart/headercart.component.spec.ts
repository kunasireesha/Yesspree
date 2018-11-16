import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadercartComponent } from './headercart.component';

describe('HeadercartComponent', () => {
  let component: HeadercartComponent;
  let fixture: ComponentFixture<HeadercartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadercartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadercartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
