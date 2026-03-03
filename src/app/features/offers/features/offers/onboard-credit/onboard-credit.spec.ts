import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardCredit } from './onboard-credit';

describe('OnboardCredit', () => {
  let component: OnboardCredit;
  let fixture: ComponentFixture<OnboardCredit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardCredit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardCredit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
