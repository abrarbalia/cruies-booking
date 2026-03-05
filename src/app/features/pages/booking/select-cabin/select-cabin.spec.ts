import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCabin } from './select-cabin';

describe('SelectCabin', () => {
  let component: SelectCabin;
  let fixture: ComponentFixture<SelectCabin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCabin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCabin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
