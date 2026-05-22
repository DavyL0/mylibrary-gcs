import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './page/dashboard/dashboard';
import { LivroFilter } from './page/livro-filter/livro-filter';
import { EmprestimosAtrasados } from './page/emprestimos-atrasados/emprestimos-atrasados';
import {CategoriaForm} from './page/categoria-form/categoria-form';

type Pagina = 'dashboard' | 'categoria' | 'livros' | 'atrasados';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DashboardComponent, LivroFilter, EmprestimosAtrasados, CategoriaForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  paginaAtiva: Pagina = 'dashboard';

  navegarPara(pagina: Pagina): void {
    this.paginaAtiva = pagina;
  }
}
