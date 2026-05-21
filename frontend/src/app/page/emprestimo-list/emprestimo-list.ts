import {Component, OnInit} from '@angular/core';
import {EmprestimoForm} from '../emprestimo-form/emprestimo-form';
import {CommonModule} from '@angular/common';
import {Emprestimo} from '../../entity/emprestimo.model';
import {EmprestimoService} from '../../service/emprestimo.service';


@Component({
  selector: 'app-emprestimo-list',
  imports: [CommonModule, EmprestimoForm],
  templateUrl: './emprestimo-list.html',
  styleUrl: './emprestimo-list.css',
})
export class EmprestimoList implements OnInit {
  emprestimos: Emprestimo[] = [];

  constructor(private service: EmprestimoService) {}

  ngOnInit(): void {
    this.carregarEmprestimos();
  }

  carregarEmprestimos(): void {
    this.service.findAll().subscribe({
      next: (dados) => this.emprestimos = dados,
      error: (err) => console.error('Erro ao carregar empréstimos', err)
    });
  }

  devolver(id: number): void {
    if (confirm('Confirmar a devolução deste livro?')) {
      this.service.devolverLivro(id).subscribe({
        next: () => {
          alert('Livro devolvido com sucesso!');
          this.carregarEmprestimos();
        },
        error: (err) => alert('Erro ao processar devolução no servidor.')
      });
    }
  }
}
