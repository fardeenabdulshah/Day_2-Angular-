import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsPerPage } from './items-per-page';

describe('ItemsPerPage', () => {
  let component: ItemsPerPage;
  let fixture: ComponentFixture<ItemsPerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsPerPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsPerPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
