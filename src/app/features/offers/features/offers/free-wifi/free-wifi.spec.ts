import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeWifi } from './free-wifi';

describe('FreeWifi', () => {
  let component: FreeWifi;
  let fixture: ComponentFixture<FreeWifi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeWifi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeWifi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
