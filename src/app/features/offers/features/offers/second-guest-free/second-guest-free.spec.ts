import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondGuestFree } from './second-guest-free';

describe('SecondGuestFree', () => {
  let component: SecondGuestFree;
  let fixture: ComponentFixture<SecondGuestFree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondGuestFree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondGuestFree);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
