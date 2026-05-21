import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { LivroService } from '../../service/livro.service';
import { EmprestimoService } from '../../service/emprestimo.service';
import { Livro, StatusLivro } from '../../entity/livro.model';
import { Emprestimo } from '../../entity/emprestimo.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  totalLivros = 0;
  totalDisponiveis = 0;
  totalEmprestados = 0;
  totalEmprestimosAtivos = 0;
  ultimosEmprestimos: Emprestimo[] = [];

  carregando = true;

  constructor(
    private livroService: LivroService,
    private emprestimoService: EmprestimoService
  ) {}

  ngOnInit(): void {
    forkJoin({
      livros: this.livroService.findAll(),
      emprestimos: this.emprestimoService.findAll()
    }).subscribe({
      next: ({ livros, emprestimos }) => {
        this.calcularEstatisticasLivros(livros);
        this.calcularEstatisticasEmprestimos(emprestimos);
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
      }
    });
  }

  private calcularEstatisticasLivros(livros: Livro[]): void {
    this.totalLivros       = livros.length;
    this.totalDisponiveis  = livros.filter(l => l.status === StatusLivro.DISPONIVEL).length;
    this.totalEmprestados  = livros.filter(l => l.status === StatusLivro.EMPRESTADO).length;
  }

  private calcularEstatisticasEmprestimos(emprestimos: Emprestimo[]): void {
    const ativos = emprestimos.filter(e => !e.dataDevolucaoEfetiva);

    this.totalEmprestimosAtivos = ativos.length;

    this.ultimosEmprestimos = [...emprestimos]
      .sort((a, b) => new Date(b.dataEmprestimo).getTime() - new Date(a.dataEmprestimo).getTime())
      .slice(0, 5);
  }

  isVencido(emprestimo: Emprestimo): boolean {
    if (emprestimo.dataDevolucaoEfetiva) return false;
    return new Date(emprestimo.dataDevolucaoPrevista) < new Date();
  }
}
