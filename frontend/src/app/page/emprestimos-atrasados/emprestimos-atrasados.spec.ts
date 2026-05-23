import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimosAtrasados } from './emprestimos-atrasados';

describe('EmprestimosAtrasados', () => {
  let component: EmprestimosAtrasados;
  let fixture: ComponentFixture<EmprestimosAtrasados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimosAtrasados],
    }).compileComponents();

    fixture = TestBed.createComponent(EmprestimosAtrasados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
