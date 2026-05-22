import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmprestimoService } from '../../service/emprestimo.service';
import { Emprestimo } from '../../entity/emprestimo.model';
@Component({
  selector: 'app-emprestimos-atrasados',
  imports: [CommonModule],
  templateUrl: './emprestimos-atrasados.html',
  styleUrl: './emprestimos-atrasados.css',
})
export class EmprestimosAtrasados implements OnInit{
  atrasados: Emprestimo[] = [];
  hoje = new Date();
  carregando = true;

  constructor(private emprestimoService: EmprestimoService) {}

  ngOnInit(): void {
    this.emprestimoService.findAtrasados().subscribe({
      next: (atrasados) => {
        this.atrasados = atrasados;
        this.carregando = false;
      },
      error: () => { this.carregando = false; }
    });
  }

  isAtrasado(emprestimo: Emprestimo): boolean {
    const prevista = new Date(emprestimo.dataDevolucaoPrevista);
    return !emprestimo.dataDevolucaoEfetiva && prevista < this.hoje;
  }

  diasAtraso(emprestimo: Emprestimo): number {
    const prevista = new Date(emprestimo.dataDevolucaoPrevista);
    const diff = this.hoje.getTime() - prevista.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  badgeClass(emprestimo: Emprestimo): string {
    const dias = this.diasAtraso(emprestimo);
    if (dias >= 10) return 'alto';
    if (dias >= 5)  return 'medio';
    return 'baixo';
  }
}
