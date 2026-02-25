import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruiseCard } from './cruise-card';

describe('CruiseCard', () => {
  let component: CruiseCard;
  let fixture: ComponentFixture<CruiseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CruiseCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CruiseCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
