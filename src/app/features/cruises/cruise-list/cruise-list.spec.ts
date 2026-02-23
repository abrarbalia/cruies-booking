import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruiseList } from './cruise-list';

describe('CruiseList', () => {
  let component: CruiseList;
  let fixture: ComponentFixture<CruiseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CruiseList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CruiseList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
