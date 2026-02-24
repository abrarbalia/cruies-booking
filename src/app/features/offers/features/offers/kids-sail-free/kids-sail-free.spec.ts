import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsSailFree } from './kids-sail-free';

describe('KidsSailFree', () => {
  let component: KidsSailFree;
  let fixture: ComponentFixture<KidsSailFree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KidsSailFree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidsSailFree);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
