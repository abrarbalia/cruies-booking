import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeBeverages } from './free-beverages';

describe('FreeBeverages', () => {
  let component: FreeBeverages;
  let fixture: ComponentFixture<FreeBeverages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeBeverages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeBeverages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
