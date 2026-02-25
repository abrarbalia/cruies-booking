import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruiseDetail } from './cruise-detail';

describe('CruiseDetail', () => {
  let component: CruiseDetail;
  let fixture: ComponentFixture<CruiseDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CruiseDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CruiseDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
