import {Component, OnInit} from '@angular/core';
import {EmprestimoForm} from '../emprestimo-form/emprestimo-form';
import {CommonModule} from '@angular/common';
import {Emprestimo} from '../../entity/emprestimo.model';
import {EmprestimoService} from '../../service/emprestimo.service';

@Component({
  selector: 'app-emprestimo-list',
  standalone: true,
  imports: [CommonModule, EmprestimoForm],
  templateUrl: './emprestimo-list.html',
  styleUrl: './emprestimo-list.css',
})
export class EmprestimoList implements OnInit {
  emprestimos: Emprestimo[] = [];
  exibirForm: boolean = false;

  constructor(
    private service: EmprestimoService
  ) {}

  ngOnInit(): void {
    this.carregarEmprestimos();
  }

  carregarEmprestimos(): void {
    this.service.findAll().subscribe({
      next: (dados) => {
        // Ordenar por data de empréstimo (mais recentes primeiro) e status (pendentes primeiro)
        this.emprestimos = dados.sort((a, b) => {
          if (!a.dataDevolucaoEfetiva && b.dataDevolucaoEfetiva) return -1;
          if (a.dataDevolucaoEfetiva && !b.dataDevolucaoEfetiva) return 1;
          return new Date(b.dataEmprestimo).getTime() - new Date(a.dataEmprestimo).getTime();
        });
      },
      error: (err) => console.error('Erro ao carregar empréstimos', err)
    });
  }

  devolver(id: number): void {
    if (confirm('Confirmar a devolução deste livro?')) {
      this.service.devolverLivro(id).subscribe({
        next: () => {
          this.carregarEmprestimos();
        },
        error: (err) => alert('Erro ao processar devolução no servidor.')
      });
    }
  }

  toggleForm(): void {
    this.exibirForm = !this.exibirForm;
  }
}
