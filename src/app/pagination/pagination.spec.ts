import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponen } from './pagination';

describe('Pagination', () => {
  let component: PaginationComponen;
  let fixture: ComponentFixture<PaginationComponen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponen],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
