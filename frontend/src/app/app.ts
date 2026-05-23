import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './page/dashboard/dashboard';
import { EmprestimosAtrasados } from './page/emprestimos-atrasados/emprestimos-atrasados';
import {CategoriaForm} from './page/categoria-form/categoria-form';

import { CategoriaList } from './page/categoria-list/categoria-list';
import { LivroList } from './page/livro-list/livro-list';
import { LivroFormComponent } from './page/livro-form/livro-form';
import { EmprestimoList } from './page/emprestimo-list/emprestimo-list';

type Pagina = 'dashboard' | 'categoria-form' | 'categoria-list' | 'livro-form' | 'livros' | 'atrasados' | 'emprestimos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DashboardComponent, LivroList, EmprestimosAtrasados, CategoriaForm, CategoriaList, LivroFormComponent, EmprestimoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  paginaAtiva: Pagina = 'dashboard';

  navegarPara(pagina: Pagina): void {
    this.paginaAtiva = pagina;
  }
}
