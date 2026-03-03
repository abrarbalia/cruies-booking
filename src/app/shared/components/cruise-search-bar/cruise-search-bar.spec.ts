import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruiseSearchBar } from './cruise-search-bar';

describe('CruiseSearchBar', () => {
  let component: CruiseSearchBar;
  let fixture: ComponentFixture<CruiseSearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CruiseSearchBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CruiseSearchBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
