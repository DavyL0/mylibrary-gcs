import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroFilter } from './livro-filter';

describe('LivroFilter', () => {
  let component: LivroFilter;
  let fixture: ComponentFixture<LivroFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(LivroFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
